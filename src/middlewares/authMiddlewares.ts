import { Request, Response, NextFunction } from 'express'
import User from '~/models/user'

// Kiểm tra tài khoản đã tồn tại hay chưa
const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body

    try {
        const user = await User.findOne({ $or: [{ username }, { email }] })
        if (user) {
            return res.status(400).json({ message: 'Username or email already exists' })
        }
        next()
    } catch (error) {
        console.error('Error in checkUserExists middleware:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export default checkUserExists
