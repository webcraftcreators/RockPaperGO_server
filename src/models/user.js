const Joi = require("joi")
const nomgoose = require("mongoose")

const userShema = new mongoose.Shema({
    username: {
        type: String,
        require: true,
        min: 6,
        max: 30,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        min: 5,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100
    },
    status: {
        type: String,
        require: false,
    },
    socketId: {
        type: String,
        require: false,
    }

})

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(6).max(30).required(),
        email: Joi.string().min(5).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        status: Joi.string().require(),
        socketId: Joi.string().required()
    })
    return schema.validate(user)
}
const User = mongoose.model('User', userSchema)
module.exports.validate = validateUser
module.exports.User = User