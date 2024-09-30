// run this script in the root to create a dummy user in the database
// donot cd into the db folder to run this
// it needs to find the .env file to connect to the database
// depends on where the directory the command is run
require('dotenv').config() 

const bcrypt = require('bcrypt')
const db = require('./index.js')

let email = 'gareth@ga.co'
let plainTextPass = 'pudding'
let saltRounds = 10


// 1. generate the salt
// 2. hash the password with the salt
// 3. insert user into database

bcrypt.genSalt(saltRounds, (err, salt) => {
  bcrypt.hash(plainTextPass, salt, (err, hash) => {
    const sql = `
      INSERT INTO users
      (email, password_digest)
      VALUES
      ('${email}', '${hash}')
      RETURNING *;
    `

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      }

      const user = result.rows[0]
      console.log(user)
    })
  })
})

