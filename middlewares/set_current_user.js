// make a current user object available in every route and template

const db = require('../db')

function setCurrentUser(req, res, next) {

  // res.locals is an express feature
  // set a locals object to use in every template
  res.locals.isLoggedIn = false
  res.locals.currentUser = {}

  // guard condition - if user is not logged in - do not set anything
  if (!req.session.userId) {
    return next()
  }

  // fetch user from database
  const sql = `
    SELECT *
    FROM users
    WHERE id = ${req.session.userId}
  `

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }

    let user = result.rows[0] // user = {id: 5, email: 'dt@ga.co'}
    res.locals.currentUser = user
    res.locals.isLoggedIn = true
    next()
  })
}

module.exports = setCurrentUser