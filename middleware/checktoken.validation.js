const jwt = require('jsonwebtoken')
const SECRET_KEY = 'colombianaperra'
const {db} = require('../config/medics')

const checkToken = (req,res,next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json({
      "message": "Token is required"
    })
  }

  jwt.verify(token,SECRET_KEY,(error,decoded)=>{
    if (error) {
      return res.status(401).json({
        "message": "Invalid token"
      })
    } else {
      return res.status(200).json({
        "message": "Ok",
        "data": db // before:decoded
      })
    }

  })

  next()
}

module.exports = {
  checkToken
}