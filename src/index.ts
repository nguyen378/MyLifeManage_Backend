import express from 'express'
import connectDB from './config/mongodb'
import authRouter from './routes/authRoutes'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

// Kết nối MongoDB
connectDB()

app.use(express.json())

// Routes
app.use('/v1/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
})

const post = process.env.POST || 3000
app.listen(post, () => {
    console.log('Server is running on http://localhost:' + post)
})
