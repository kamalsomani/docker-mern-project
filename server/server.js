const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const db = require('./db')
const movieRouter = require('./routes/movie-router')

const app = express()
const apiPort = 5000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

db.on('error', (error) => console.error('MongoDB connection error:', error ))
db.once('open', () => console.log('Connected to MongoDB '))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', movieRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))