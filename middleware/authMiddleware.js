const { jwtVerifyAsync } = require('../utils/jwt')

module.exports = async (req, res, next) => {
  // Añadir header Authorization-Bearer
  const token = req.cookies.uid

  if (!token) {
    return res.status(401).send('A token is required for authentication')
  }

  try {
    const decodedUser = await jwtVerifyAsync(token)
    req.user = decodedUser
  } catch (err) {
    res.set(
      'WWW-Authenticate',
      'Bearer realm="Bearer authentication" error="invalid_token"'
    )
    res.status(401).send('Invalid Token')
  }

  return next()
}
