import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String },
    socketId: { type: String }
});

export const validate = (user) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(user);
};

export const User = mongoose.model('User', userSchema);