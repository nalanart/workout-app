const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./api/router')
const path = require('path')

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())

app.use('/', router)

if(process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  //Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})