import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Pataisyta: "require" -> "required"
    min: 6,
    max: 30,
  },
  email: {
    type: String,
    required: true, // Pataisyta: "require" -> "required"
    unique: true,
    min: 5,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 100,
  },
  status: {
    type: String,
    default: null,
    required: false, // Pataisyta: "require" -> "required"
  },
  socketId: {
    type: String,
    default: null,
    required: false, // Pataisyta: "require" -> "required"
  },
});

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(6).max(30).required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    status: Joi.string(),
    socketId: Joi.string(),
  });
  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

export { User, validateUser as validate };
