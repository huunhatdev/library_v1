require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db')
const router = require('./src/routes')
const { errorMiddleware } = require('./src/middlewares/error.middleware')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', router)
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
