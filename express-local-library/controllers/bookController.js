const { body, validationResult } = require('express-validator')
const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookinstance')

const async = require('async')

exports.index = (req, res) => {
  async.parallel(
    {
      book_count: (cb) => {
        Book.countDocuments({}, cb)
      },
      book_instance_count: (cb) => {
        BookInstance.countDocuments({}, cb)
      },
      book_instance_available_count: (cb) => {
        BookInstance.countDocuments(
          {
            status: 'Available'
          },
          cb
        )
      },
      author_count: (cb) => {
        Author.countDocuments({}, cb)
      },
      genre_count: (cb) => {
        Genre.countDocuments({}, cb)
      }
    },
    (er, results) => {
      res.render('index', {
        title: 'Local Library Home',
        error: er,
        data: results
      })
    }
  )
}

exports.book_list = (req, res, next) => {
  Book.find({}, 'title author')
    .populate('author')
    .exec((er, list_books) => {
      if (er) {
        return async.next(er)
      }

      res.render('book_list', {
        title: 'Book List',
        book_list: list_books
      })
    })
}

exports.book_detail = (req, res, next) => {
  async.parallel(
    {
      book: (cb) => {
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(cb)
      },

      book_instances: (cb) => {
        BookInstance.find({
          book: req.params.id
        }).exec(cb)
      }
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.book === null) {
        const er = new Error('Book not found')
        er.status = 404
        return next(er)
      }

      res.render('book_detail', {
        title: results.book.title,
        book: results.book,
        book_instances: results.book_instances
      })
    }
  )
}

exports.book_create_get = (req, res, next) => {
  async.parallel(
    {
      authors: (cb) => Author.find(cb),
      genres: (cb) => Genre.find(cb)
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      res.render('book_form', {
        title: 'Create Book',
        authors: results.authors,
        genres: results.genres
      })
    }
  )
}

exports.book_create_post = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = []
      else req.body.genre = new Array(req.body.genre)
    }
    next()
  },

  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }),
  body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }),
  body('genre').trim().isLength({ min: 1 }),

  body('*').escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
    })

    if (!errors.isEmpty()) {
      async.parallel(
        {
          authors: (cb) => Author.find(cb),
          genres: (cb) => Genre.find(cb)
        },
        (er, results) => {
          if (er) {
            return next(er)
          }

          for (let i = 0; i < results.genres.isLength; i++) {
            if (book.genre.indexOf(results.genres[i]._id) > -1) {
              results.genres[i].checked = 'true'
            }
          }
          res.render('book_form', {
            title: 'Create Book',
            authors: results.authors,
            genres: results.genres
          })
        }
      )
      return
    } else {
      book.save((er) => {
        if (er) {
          return next(er)
        }

        res.redirect(book.url)
      })
    }
  }
]

exports.book_delete_get = (req, res, next) => {
  async.parallel(
    {
      book: (cb) =>
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(cb),
      book_instances: (cb) =>
        BookInstance.find({ book: req.params.id }).exec(cb)
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.book === null) {
        res.redirect('/catalog/books')
      }

      res.render('book_delete', {
        title: 'Delete Book',
        book: results.book,
        book_instances: results.book_instances
      })
    }
  )
}

exports.book_delete_post = (req, res, next) => {
  async.parallel(
    {
      book: (cb) =>
        Book.findById(req.body.id)
          .populate('author')
          .populate('genre')
          .exec(cb),
      book_instances: (cb) => BookInstance.find({ book: req.body.id }).exec(cb)
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.book_instances.length > 0) {
        res.render('book_delete', {
          title: 'Delete Book',
          book: results.book,
          book_instances: results.book_instances
        })
      } else {
        Book.findByIdAndRemove(req.body.id, function deleteBook(er) {
          if (er) {
            return next(er)
          }

          res.redirect('/catalog/books')
        })
      }
    }
  )
}

exports.book_update_get = (req, res, next) => {
  async.parallel(
    {
      book: (cb) =>
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(cb),
      authors: (cb) => Author.find(cb),
      genres: (cb) => Genre.find(cb)
    },
    (er, results) => {
      if (er) {
        return next(er)
      }

      if (results.book === null) {
        const er = new Error('Book not found.')
        er.status = 404
        return next(er)
      }

      for (all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
        for (
          book_g_iter = 0;
          book_g_iter < results.book.genre.length;
          book_g_iter++
        ) {
          if (
            results.genres[all_g_iter]._id.toString() ===
            results.book.genre[book_g_iter]._id.toString()
          ) {
            results.genres[all_g_iter].checked = 'true'
          }
        }
      }
      res.render('book_form', {
        title: 'Update Book',
        authors: results.authors,
        genres: results.genres,
        book: results.book
      })
    }
  )
}

exports.book_update_post = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = []
      else req.body.genre = new Array(req.body.genre)
    }
    next()
  },

  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }),
  body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }),

  body('*').escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: typeof req.body.genre === 'undefined' ? [] : req.body.genre,
      _id: req.params.id
    })

    if (!errors.isEmpty()) {
      async.parallel(
        {
          authors: (cb) => Author.find(cb),
          genres: (cb) => Genre.find(cb)
        },
        (er, results) => {
          if (er) {
            return next(er)
          }

          for (let i = 0; i < results.genres.length; i++) {
            if (book.genre.indexOf(results.genres[i]._id) > -1) {
              results.genres[i].checked = 'true'
            }
          }
          res.render('book_form', {
            title: 'Update Book',
            authors: results.authors,
            genres: results.genres,
            book: book,
            errors: errors.array()
          })
        }
      )
      return
    } else {
      Book.findByIdAndUpdate(req.params.id, book, {}, (er, thebook) => {
        if (er) {
          return next(er)
        }

        res.redirect(thebook.url)
      })
    }
  }
]
