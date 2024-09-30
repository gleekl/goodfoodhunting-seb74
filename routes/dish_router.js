const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')

router.get('/dishes/new', ensureLoggedIn, (req, res) => {
  res.render('new_form')
})

router.post('/dishes', ensureLoggedIn, (req, res) => {
  let title = req.body.title
  let imageUrl = req.body.image_url
  let description = req.body.description

  let sql = `
    INSERT INTO
      dishess
    (title, image_url, description)
      values
    ('${title}', '${imageUrl}', '${description}');
  `

  // actually insert the dish
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }

    // pattern - get post redirect
    // tell the client to make a request to get '/'
    // redirect is always a get
    res.redirect('/')
  })

})

router.get('/dishes/:id', (req, res) => {
  db.query(`SELECT * FROM dishes WHERE id = ${req.params.id};`, (err, result) => {
    if (err) {
      console.log(err)
    }
    let dish = result.rows[0] 
    res.render('dish', { dish: dish })
  })
})

router.delete('/dishes/:dishId', ensureLoggedIn, (req, res) => {
  const sql = `
    DELETE FROM dishes
    WHERE id = ${req.params.dishId}; 
  `

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/')
  })
})

router.get('/dishes/:dishId/edit', ensureLoggedIn, (req, res) => {

  // 5 -----> { id: 5, title: 'cake' }
  const sql = `
    SELECT * FROM dishes
    WHERE id = ${req.params.dishId};
  `

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    const dish = result.rows[0]
    res.render('edit_form', { dish: dish })
  })

})

router.put('/dishes/:dishId', ensureLoggedIn, (req, res) => {

  const title = req.body.title
  const imageUrl = req.body.image_url
  const description = req.body.description
  const dishId = req.params.dishId

  const sql = `
    UPDATE dishes
    SET title = '${title}', 
    image_url = '${imageUrl}', 
    description = '${description}'
    WHERE id = ${dishId};
  `

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.redirect(`/dishes/${dishId}`)
  })
})

module.exports = router