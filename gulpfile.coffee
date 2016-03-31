gulp = require 'gulp'

# gulp.task 'watch', ->
#   gulp.watch 'sass/*.sass',['styles']
#   gulp.watch 'gulpfile.coffee',['coffee','styles']

gulp.task 'express', ->
  express = require 'express'
  port = 4000
  mongoose = require 'mongoose'

  app = express()

  Country = require './models/country'
  User = require './models/user'

  index_route = require('./routes/index')
  users_route = require('./routes/users')
  countries_route = require('./routes/countries')

  db = 'mongodb://localhost/test'

  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')

  app.use(express.static(__dirname))

  mongoose.connect db

  app.use('/', index_route)
  app.use('/users', users_route)
  app.use('/countries', countries_route)

  app.listen port

gulp.task 'default',['express']