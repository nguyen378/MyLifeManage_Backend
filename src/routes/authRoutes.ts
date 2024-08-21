import { Router } from 'express'
import { authEndpoint, freeEndpoint, login, register } from '~/controllers/authController'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)

authRouter.get('/free-endpoint', freeEndpoint)
authRouter.get('/auth-endpoint', authEndpoint, (req, res) => {
    res.json({ message: 'You are authorized' })
})

export default authRouter
