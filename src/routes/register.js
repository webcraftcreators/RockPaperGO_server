import { User, validate } from '../models/user.js';
import bcrypt from 'bcrypt';
import express from 'express';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('User already exisits. Please sign in')
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: password,
                status: null,
                socketId: null
            })
            await user.save()
            return res.status(201).json(user)
        }catch (err) {
            return res.status(400).json({ message: err.message})
        }
    }
})

export default router;