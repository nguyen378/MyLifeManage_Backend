import express from 'express'
import connectDB from './config/mongodb'
import authRouter from './routes/authRoutes'

const app = express()

// Kết nối MongoDB
connectDB()

app.use(express.json())

// Routes
app.use('/v1/auth', authRouter)

app.post('/', (req, res) => {})

app.get('/', (req, res) => {
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT)
})
