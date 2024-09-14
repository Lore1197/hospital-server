const authorized = ["19063187","40748287"]

const checkAuth = (req,res,next) => {
  const {authorization} = req.headers
  if (!authorized.includes(authorization)) {
    return res.status(401).json({
      "message": "unathorized"
    })
  } 
  next()
}

module.exports = {
  checkAuth
}