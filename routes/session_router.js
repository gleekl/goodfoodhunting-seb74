const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  
  // 1. get the email & password from the request
  const email = req.body.email
  const password = req.body.password
  
  // 2. check if the user exists in the database using the email address
  const sql = `
  SELECT * 
  FROM users
  WHERE email = '${email}';
  `
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    
    if (result.rows.length === 0) {
      console.log('user not found')
      return res.send('user not found')
    }
    
    // 3. check password is valid or not
    const user = result.rows[0]
    bcrypt.compare(password, user.password_digest, (err, isCorrect) => {
      if (err) {
        console.log(err);
      }
      
      if (!isCorrect) {
        console.log('password is wrong')
        return res.send('password is wrong')
      }
         
      // 4. yay - its time to create a session for this user
      // store in a unique locker box for this unique user a userId
      // userId is a key that we made up
      req.session.userId = user.id
      // up to your own use case, take the user where you want them to go
      res.redirect('/')
    })

  })

})

router.delete('/session', (req, res) => {
  // req.session.userId = null
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/login')
  })
})

module.exports = router