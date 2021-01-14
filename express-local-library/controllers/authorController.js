const { body, check, validationResult } = require('express-validator')
const Author = require('../models/author')
const Book = require('../models/book')

const async = require('async')

exports.author_list = (req, res, next) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec((er, list_authors) => {
      if (er) {
        return next(er)
      }

      res.render('author_list', {
        title: 'Author List',
        author_list: list_authors
      })
    })
}

exports.author_detail = (req, res, next) => {
  async.parallel(
    {
      author: (cb) => {
        Author.findById(req.params.id).exec(cb)
      },
      author_books: (cb) => {
        Book.find(
          {
            author: req.params.id
          },
          'title summary'
        ).exec(cb)
      }
    },
    (er, data) => {
      if (er) {
        return next(er)
      }

      if (data.author === null) {
        const er = new Error('Author not found.')
        er.status = 404
        return next(er)
      }

      res.render('author_detail', {
        title: 'Author Detail',
        author: data.author,
        author_books: data.author_books
      })
    }
  )
}

exports.author_create_get = (req, res, next) => {
  res.render('author_form', {
    title: 'Create Author'
  })
}

exports.author_create_post = [
  check('first_name')
    .isLength({
      min: 1
    })
    .trim()
    .withMessage('First name must be specified')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),

  check('family_name')
    .isLength({
      min: 1
    })
    .trim()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),

  body('date_of_birth', 'Invalid date of birth')
    .optional({
      checkFalsy: true
    })
    .isISO8601(),
  body('date_of_death', 'Invalid date of death')
    .optional({
      checkFalsy: true
    })
    .isISO8601(),

  body('first_name').escape(),
  body('family_name').escape(),
  body('date_of_birth').toDate(),
  body('date_of_death').toDate(),

  (req, res, next) => {
    const errors = validationResult(req)

    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death
    })

    if (!errors.isEmpty()) {
      res.render('author_form', {
        title: 'Create Author',
        author: author,
        errors: errors.array()
      })
      return
    } else {
      Author.findOne({
        date_of_birth: req.body.date_of_birth
      }).exec((er, found_author) => {
        console.log(found_author)
        if (er) {
          return next(er)
        }

        if (found_author) {
          res.redirect(found_author.url)
        } else {
          author.save((er) => {
            if (er) {
              return next(er)
            }

            res.redirect(author.url)
          })
        }
      })
    }
  }
]

exports.author_delete_get = (req, res, next) => {
  async.parallel(
    {
      author: (cb) => Author.findById(req.params.id).exec(cb),
      author_books: (cb) =>
        Book.find({
          author: req.params.id
        }).exec(cb)
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.author === null) {
        res.redirect('/catalog/authors')
      }

      res.render('author_delete', {
        title: 'Delete Author',
        author: results.author,
        author_books: results.author_books
      })
    }
  )
}

exports.author_delete_post = (req, res, next) => {
  async.parallel(
    {
      author: (cb) => Author.findById(req.body.authorid).exec(cb),
      author_books: (cb) =>
        Book.find({
          author: req.body.authorid
        }).exec(cb)
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.author_books.length > 0) {
        res.render('author_delete', {
          title: 'Delete Author',
          author: results.author,
          author_books: results.authors_books
        })
        return
      } else {
        Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(er) {
          if (er) {
            return next(er)
          }

          res.redirect('/catalog/authors')
        })
      }
    }
  )
}

exports.author_update_get = (req, res, next) => {
  Author.findById(req.params.id, (er, author) => {
    if (er) {
      return next(er)
    }

    if (author === null) {
      const er = new Error('Author not found.')
      er.status = 404
      return next(er)
    }

    res.render('author_form', {
      title: 'Update Author',
      author: author
    })
  })
}

exports.author_update_post = [
  check('first_name')
    .isLength({
      min: 1
    })
    .trim()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  check('family_name')
    .isLength({
      min: 1
    })
    .trim()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({
      checkFalsy: true
    })
    .isISO8601(),
  body('date_of_death', 'Invalid date of death')
    .optional({
      checkFalsy: true
    })
    .isISO8601(),

  body('first_name').escape(),
  body('family_name').escape(),
  body('date_of_birth').toDate(),
  body('date_of_death').toDate(),

  (req, res, next) => {
    const errors = validationResult(req)

    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
      _id: req.params.id
    })

    if (!errors.isEmpty()) {
      res.render('author_form', {
        title: 'Update Author',
        author: author,
        errors: errors.array()
      })
      return
    } else {
      Author.findByIdAndUpdate(req.params.id, author, {}, (er, theauthor) => {
        if (er) {
          return next(er)
        }

        res.redirect(theauthor.url)
      })
    }
  }
]
