const express = require ('express')
const connectDB = require('./Config/ConnectDB')
const userRouter = require('./Routes/User')

const app = express()

require('dotenv').config()

app.use(express.json())

app.use('/api/auth', userRouter)

connectDB()







app.listen(process.env.port, console.log(`server is running on port ${process.env.port}`))

