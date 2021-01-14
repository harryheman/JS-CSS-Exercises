const { body, validationResult } = require('express-validator')
const Genre = require('../models/genre')
const Book = require('../models/book')

const async = require('async')
const genre = require('../models/genre')

exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((er, list_genre) => {
      if (er) {
        return next(er)
      }

      res.render('genre_list', { title: 'Genre List', genre_list: list_genre })
    })
}

exports.genre_detail = (req, res, next) => {
  async.parallel(
    {
      genre: (cb) => {
        Genre.findById(req.params.id).exec(cb)
      },

      genre_books: (cb) => {
        Book.find({ genre: req.params.id }).exec(cb)
      }
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.genre === null) {
        const er = new Error('Genre not found')
        er.status = 404
        return next(er)
      }

      res.render('genre_detail', {
        title: 'Genre Detail',
        genre: results.genre,
        genre_books: results.genre_books
      })
    }
  )
}

exports.genre_create_get = (req, res, next) => {
  res.render('genre_form', { title: 'Greate Genre' })
}

exports.genre_create_post = [
  body('name', 'Genre name required').trim().isLength({ min: 1 }),
  body('name').escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    const genre = new Genre({
      name: req.body.name
    })

    if (!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array()
      })
      return
    } else {
      Genre.findOne({ name: req.body.name }).exec((er, found_genre) => {
        if (er) {
          return next(er)
        }

        if (found_genre) {
          res.redirect(found_genre.url)
        } else {
          genre.save((er) => {
            if (er) {
              return next(er)
            }

            res.redirect(genre.url)
          })
        }
      })
    }
  }
]

exports.genre_delete_get = (req, res, next) => {
  async.parallel(
    {
      genre: (cb) => Genre.findById(req.params.id).exec(cb),
      genre_books: (cb) => Book.find({ genre: req.params.id }).exec(cb)
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.genre === null) {
        res.redirect('/catalog/genres')
      }

      res.render('genre_delete', {
        title: 'Delete Genre',
        genre: results.genre,
        genre_books: results.genre_books
      })
    }
  )
}

exports.genre_delete_post = (req, res, next) => {
  async.parallel(
    {
      genre: (cb) => Genre.findById(req.params.id).exec(cb),
      genre_books: (cb) => Book.find({ genre: req.params.id }).exec(cb)
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.genre_books.length > 0) {
        res.render('genre_delete', {
          title: 'Delete Genre',
          genre: results.genre,
          genre_books: results.genre_books
        })
        return
      } else {
        Genre.findByIdAndRemove(req.body.id, function deleteGenre(er) {
          if (er) {
            return next(er)
          }

          res.redirect('/catalog/genres')
        })
      }
    }
  )
}

exports.genre_update_get = (req, res, next) => {
  Genre.findById(req.params.id, (er, genre) => {
    if (er) {
      return next(er)
    }

    if (genre === null) {
      const er = new Error('Genre not found.')
      er.status = 404
      return next(er)
    }

    res.render('genre_form', { title: 'Update Genre', genre: genre })
  })
}

exports.genre_update_post = [
  body('name', 'Genre name required').isLength({ min: 1 }).trim(),

  body('name').escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id
    })

    if (!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Update Genre',
        genre: genre,
        errors: errors.array()
      })
      return
    } else {
      Genre.findByIdAndUpdate(req.params.id, genre, {}, (er, thegenre) => {
        if (er) {
          return next(er)
        }

        res.redirect(thegenre.url)
      })
    }
  }
]
