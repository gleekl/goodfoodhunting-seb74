const { Pool } = require("pg")

const config = {
  dev: {
    database: "goodfoodhunting",
    username: "garethlee",
    password: "1234"
  },
  prod: {
    connectionString: process.env.DATABASE_URL,
  },
}

const pool = new Pool(process.env.DATABASE_URL ? config.prod : config.dev)

module.exports = pool

// connect to db using a config object
// const db = new pg.Pool({
//   database: 'goodfoodhunting',
//   key: value,
//   key: value
// })