// src/config/mongodb.ts
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || ''
        await mongoose.connect(mongoURI)
        console.log('MongoDB connected successfully')
    } catch (error) {
        if (error instanceof mongoose.Error) {
            console.error('Mongoose-specific error:', error.message)
        } else {
            console.error('MongoDB connection error:', error)
        }
        process.exit(1)
    }
}

export default connectDB
