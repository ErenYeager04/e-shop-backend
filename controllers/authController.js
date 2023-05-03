const User = require('../models/User')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const userSignup = async (req, res) => {
  const {email, password} = req.body
  try{
    // Validation results
    const error = validationResult(req)
    if (!error.isEmpty()){
      res.status(400).json("All field must be filled")
      return
    }
    const user = await User.signup(email, password)

    const userId = user._id

    const token = await jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET, {expiresIn: "3d"})
 
    res.status(200).json({userId, token})

  }catch(err){
    console.log(err.message)
    res.status(400).json(err.message)
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body
  try{
    // Validation results
    const error = validationResult(req)
    if (!error.isEmpty()){
      res.status(400).json("All field must be filled")
      return
    }
    const user = await User.login(email, password)
    const userId = user._id
    const token = await jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET, {expiresIn: "3d"})
    res.status(200).json({userId, token})

  }catch(err){
    res.status(400).json(err.message)
  }

}

module.exports = { userSignup, userLogin }