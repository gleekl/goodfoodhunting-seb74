require('dotenv').config()

const express = require('express')
const app = express()
const port = 4567
const expressLayouts = require('express-ejs-layouts')
const requestLogger = require('./middlewares/request_logger')
const methodOverride = require('method-override')
const session = require('express-session')
const setCurrentUser = require('./middlewares/set_current_user')
const sessionRouter = require('./routes/session_router')
const dishRouter = require('./routes/dish_router')
const pageRouter = require('./routes/page_router')

app.set('view engine', 'ejs')

app.use(requestLogger)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"));
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 }, // 3 days
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(setCurrentUser)
app.use(expressLayouts) 
app.use(sessionRouter)
app.use(pageRouter)
app.use(dishRouter)

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

// http - stateless
// login - creating a session
// get is consider a safe method - because it has no side effects
// http methods - get , post,   put,    delete
// crud        - read  create  update  destroy
// sql        - select insert udpate  delete
