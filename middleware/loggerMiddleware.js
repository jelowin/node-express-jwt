module.exports = (req, res, next) => {
  const { body, method, path } = req
  console.log(`${method} - ${path} - ${JSON.stringify(body)}`)
  next()
}
