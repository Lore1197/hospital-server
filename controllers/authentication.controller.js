const {usuarios} = require('../config/usuarios')
const jwt = require('jsonwebtoken')
const { use } = require('../routes/usuarios.route')
const SECRET_KEY = 'colombianaperra'

// register

const register = async (req,res) => {
  const input = req.body
  const user = createUser(input)
  try {
    const output = await addUserToDB(user)
    return res.status(200).json({
      message: output
    })
  } catch (error) {
      res.status(500).send()
  }
}

//login

const login = (req,res) => {
  const {dni} = req.body
  const user = usuarios.find((usuario)=>{
    return usuario.dni === dni
  })
  const token = jwt.sign(user,SECRET_KEY,{expiresIn:"1h"})
  return res.status(200).json({
    data : user,
    token
  })
}

function createUser(input) {
  const newUser= {
    "id": usuarios.length + 1,
    "name": input.name,
    "surname": input.surname,
    "dni": input.dni,
    "pin": input.pin
  }
  return newUser
}

function addUserToDB(newUser) {
  console.log("Adding new user to the DB...")
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      usuarios.push(newUser)
      resolve("New user was succesfully added")
    }, 2000);
  })

 }


module.exports = {
  register,
  login
}