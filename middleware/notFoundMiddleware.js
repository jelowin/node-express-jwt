module.exports = (req, res) => {
  console.log(`PATH ${req.path} not found`)
  res.status(404).send('Not Found')
}
