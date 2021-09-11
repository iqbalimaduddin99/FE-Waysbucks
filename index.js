require('dotenv').config()
const express = require('express')
const router = require('./src/routers')
const cors = require('cors')
const port = 1000
const app = express()

app.use(express.json())
app.use(cors())

app.use('/public', express.static('public'))
app.use('/api/v1/', router)


app.listen(port, () => {
    console.log(`Your server running on port ${port}`)
})

