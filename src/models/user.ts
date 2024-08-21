import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
    username: string
    password: string
    email: string
    role: string
    resetPasswordToken: string
    resetPasswordExpires: Date
}
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

const User = model<IUser>('User', userSchema)
export default User
