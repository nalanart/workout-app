const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')
  if(!token) {
    return res.status(401).send('Please log in')
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch(error) {
    res.status(400).send('Invalid Token')
  }
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token === null) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if(err) {
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

module.exports = authenticateToken