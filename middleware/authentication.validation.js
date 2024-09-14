// Importing

const {usuarios} = require('../config/usuarios')

const authenticationValidation = (req,res,next) => {
  const {name,surname,dni,pin} = req.body
  const nameRegex = /^[A-Za-z]+$/;
  const surnameRegex = /^[A-Za-z]+$/;
  const numbersOnlyRegex = /^\d+$/;
  const dniAlreadyExists = usuarios.some((usuario) => {
    return usuario.dni === dni
  })

  if (!name) {
    return res.status(400).json({
      message : "Name is required"
    })
  }

  if (!nameRegex.test(name)) {
    return res.status(400).json({
      message : "Invalid name"
    })
  }

  if (!surname) {
    return res.status(400).json({
      message : "Surname is required"
    })
  }

  if (!surnameRegex.test(surname)) {
    return res.status(400).json({
      message : "Invalid surname"
    })

  }

  if (!numbersOnlyRegex.test(dni)) {
    return res.status(400).json({
      message : "Invalid DNI"
    })
  } 


  if (dniAlreadyExists) {
    return res.status(400).json({
      message : "DNI already exists"
    })
  }

  if (!numbersOnlyRegex.test(pin)) {
    return res.status(400).json({
      message : "Pin is invalid"
    })
  }
  next()
}

module.exports = {
  authenticationValidation
}

