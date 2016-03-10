gulp = require 'gulp'

# gulp.task 'watch', ->
#   gulp.watch 'sass/*.sass',['styles']
#   gulp.watch 'gulpfile.coffee',['coffee','styles']

gulp.task 'express', ->
  express = require 'express'
  app = express()
  router = express.Router()

  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')

  app.use(router)
  app.use(express.static(__dirname))

  router.get '/', (req, res) ->  
    res.render 'index'

  router.get '/users', (req, res) ->  
    res.render 'users'

  router.get '/countries', (req, res) ->  
    res.render 'countries'

  app.listen 4000

gulp.task 'default',['express']