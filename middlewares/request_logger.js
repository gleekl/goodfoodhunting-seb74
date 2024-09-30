
// middleware callback function - function signature
function requestLogger(req, res, next) {
  console.log(new Date().toLocaleString())
  console.log(`${req.method} ${req.path}`) // POST /dishes
  next() // go to the next station
}

module.exports = requestLogger