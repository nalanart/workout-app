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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/public/index.html'))
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})