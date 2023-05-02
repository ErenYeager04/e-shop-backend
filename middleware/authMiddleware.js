const jwt = require('jsonwebtoken')
const User = require('../models/User')


const requireAuth = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json("Not authorized")
  }
  const token = authorization.split(' ')[1]
  
  try {
    
    const decoded = await jwt.verify(token, process.env.SECRET)
    req.user = decoded
    
    next()
  } catch (error) {
    res.status(401).json("Sign up please")
    
  }

}

module.exports =  requireAuth