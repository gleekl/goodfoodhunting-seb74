const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const db = require("./../db")

router.get("/signup", (req, res) => {
  res.render("signup")
})

/* warning - will create multiple users with the same email */
router.post("/", (req, res) => {
  const { email, password, passwordConfirmation } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, digestedPassword) => {
      const sql = `
        insert into users (email, password_digest)
        values ($1, $2) returning id;
      `

      db.query(sql, [email, digestedPassword], (err, dbRes) => {
        if (err) {
          console.err(err)
          res.render("signup")
        } else {
          req.session.userId = dbRes.rows[0].id
          res.redirect("/")
        }
      })
    })
  })
})

module.exports = router