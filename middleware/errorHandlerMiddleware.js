module.exports = (error, req, res) => {
  console.log('Error Handling Middleware called')
  console.log('Path: ', req.path)
  console.error('Error: ', error)
}
