const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  console.log(req.session.userId)
  db.query('SELECT * FROM dishes;', (err, result) => {
    if (err) {
      console.log(err);
    }

    let dishes = result.rows // [{id: 1, title: 'cake'}, {id: 2, title: 'pudding'}]
    res.render('home', { dishes: dishes })  
  })
})

router.get('/about', (req, res) => {
  res.send('back to you...')
})

module.exports = router