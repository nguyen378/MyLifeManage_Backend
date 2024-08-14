import { Request, Response } from 'express'
import User, { IUser } from '~/models/user'
import bcrypt from 'bcryptjs'

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
