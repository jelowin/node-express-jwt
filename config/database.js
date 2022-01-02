const mongoose = require("mongoose");
const { MONGO_URI } = process.env

// TODO Add new test DB
// const connectionString = NODE_ENV === 'test'
// ? MONGO_URI_TEST
// : MONGO_URI

const connectionString = MONGO_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((db) => {
    console.log('Database connected to', db.connections[0].name)
    console.log('Database collections: ', Object.keys(db.connections[0].collections))
  }).catch(err => {
    console.error(err)
  })

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})
