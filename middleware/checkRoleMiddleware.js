const jwt = require('jsonwebtoken')

module.exports = function() {
  return function (req, res, next) {
    if(req.method === "OPTIONS" ){
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if(!token){
        return res.status(400).json('Not authenticated')
      }
  
      const decoded = jwt.verify(token, process.env.SECRET)
      if (!decoded.isAdmin){
        res.status(400).json("You dont have access")
      }else {
        req.user = decoded
        next()
      }
      
    }catch(err){
      res.status(400).json('Not authenticated')
    }
  }
}