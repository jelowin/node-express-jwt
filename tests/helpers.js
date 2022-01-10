const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../index')

const api = supertest(app)

const closeConnection = async (done) => {
  await mongoose.disconnect(done);
  server.close();
}

module.exports = {
  api,
  closeConnection
}