import { Request, Response } from 'express'
import User, { IUser } from '~/models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    try {
        // Kiểm tra xem tài khoản đã tồn tại hay chưa
        const user = await User.findOne({ $or: [{ username }, { email }] })
        if (user) {
            return res.status(400).json({ message: 'Username or email already exists' })
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 12)

        // Tạo tài khoản mới
        const newUser: IUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()

        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        console.error('Error in register controller:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Đăng nhập tài khoản sử dụng jwt
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        // Kiểm tra xem tài khoản đã tồn tại hay chưa
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // Trả về token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
        )

        res.json({
            message: 'Login successful',
            email: user.email,
            token
        })
    } catch (error) {
        console.error('Error in login controller:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
