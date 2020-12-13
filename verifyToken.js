const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')
  if(!token) {
    return res.status(401).send('Please log in')
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
  } catch(error) {
    res.status(400).send('Invalid Token')
  }
}