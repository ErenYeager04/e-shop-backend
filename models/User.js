const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  }, 
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
})

userSchema.statics.signup = async function(email, password) {

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error("Email is already in use")
  }

  const hashedPassword = await bcrypt.hash(password, 5)

  const user = await this.create({email, password: hashedPassword})

  return user

}

userSchema.statics.login = async function(email, password) {

  const user = await this.findOne({ email })

  if (!user) {
    throw Error("Wrong email")
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match){
    throw Error("Wrong password")
  }

  return user

}

module.exports = mongoose.model('User', userSchema)