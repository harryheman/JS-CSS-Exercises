const { body, validationResult } = require('express-validator')
const Book = require('../models/book')
const BookInstance = require('../models/bookinstance')

const async = require('async')

exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate('book')
    .exec((er, list_bookinstances) => {
      if (er) {
        return next(er)
      }

      res.render('bookinstance_list', {
        title: 'Book Instance List',
        bookinstance_list: list_bookinstances
      })
    })
}

exports.bookinstance_detail = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((er, bookinstance) => {
      if (er) {
        return next(er)
      }

      if (bookinstance === null) {
        const er = new Error('Book copy not found.')
        er.status = 404
        return next(er)
      }

      res.render('bookinstance_detail', {
        title: `Copy: ${bookinstance.book.title}`,
        bookinstance: bookinstance
      })
    })
}

exports.bookinstance_create_get = (req, res, next) => {
  Book.find({}, 'title').exec((er, books) => {
    if (er) {
      return next(er)
    }

    res.render('bookinstance_form', {
      title: 'Create BookInstance',
      book_list: books
    })
  })
}

exports.bookinstance_create_post = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  body('book').escape(),
  body('imprint').escape(),
  body('status').trim().escape(),
  body('due_back').toDate(),

  (req, res, next) => {
    const errors = validationResult(req)

    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back
    })

    if (!errors.isEmpty()) {
      Book.find({}, 'title').exec((er, books) => {
        if (er) {
          return next(er)
        }

        res.render('bookinstance_form', {
          title: 'Create BookInstance',
          book_list: books,
          selected_book: bookinstance.book._id,
          errors: errors.array(),
          bookinstance: bookinstance
        })
      })
      return
    } else {
      bookinstance.save((er) => {
        if (er) {
          return next(er)
        }

        res.redirect(bookinstance.url)
      })
    }
  }
]

exports.bookinstance_delete_get = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((er, bookinstance) => {
      if (er) {
        return next(er)
      }

      if (bookinstance === null) {
        res.redirect('/catalog/bookinstances')
      }

      res.render('bookinstance_delete', {
        title: 'Delete BookInstance',
        bookinstance: bookinstance
      })
    })
}

exports.bookinstance_delete_post = (req, res, next) => {
  BookInstance.findByIdAndRemove(req.body.id, function deleteBookInstance(er) {
    if (er) {
      return next(er)
    }

    res.redirect('/catalog/bookinstances')
  })
}

exports.bookinstance_update_get = (req, res, next) => {
  async.parallel(
    {
      bookinstance: (cb) =>
        BookInstance.findById(req.params.id).populate('book').exec(cb),
      books: (cb) => Book.find(cb)
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.bookinstance === null) {
        const er = new Error('Book copy not found.')
        er.status = 404
        return next(er)
      }

      res.render('bookinstance_form', {
        title: 'Update BookInstance',
        book_list: results.books,
        selected_book: results.bookinstance.book._id,
        bookinstance: results.bookinstance
      })
    }
  )
}

exports.bookinstance_update_post = [
  body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
  body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  body('book').escape(),
  body('imprint').escape(),
  body('status').escape(),
  body('due_back').toDate(),

  (req, res, next) => {
    const errors = validationResult(req)

    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id
    })

    if (!errors.isEmpty()) {
      Book.find({}, 'title').exec((er, books) => {
        if (er) {
          return next(er)
        }

        res.render('bookinstance_form', {
          title: 'Update BookInstance',
          book_list: books,
          selected_book: bookinstance.book._id,
          errors: errors.array(),
          bookinstance: bookinstance
        })
      })
      return
    } else {
      BookInstance.findByIdAndUpdate(
        req.params.id,
        bookinstance,
        {},
        (er, thebookinstance) => {
          if (er) {
            return next(er)
          }

          res.redirect(thebookinstance.url)
        }
      )
    }
  }
]
