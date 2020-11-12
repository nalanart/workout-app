const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./api/router')

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})