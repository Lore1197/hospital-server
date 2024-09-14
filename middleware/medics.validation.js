const {schema} = require('../schema/medic.schema')
const {db} = require('../config/medics')

const inputValidation = (req,res,next) => {
  console.log("Validating data...")
  const input = req.body
  const {value,error} = schema.validate(input);
  if (error) {
    //console.log(error)
    return res.status(400).json({
      "message": error.details[0].message
    }) 
  }
  next()
}

const medicExists = (req,res,next) => {
  console.log("Validating that the medic exists")
  const document = req.body.dni
  const medicAlreadyExists = db.some((medic) => medic.dni === document)
  if (medicAlreadyExists) {
    return res.status(400).json({
      "message": "Medic already exists"
    })
  } else {
    next()
  }
}

const idIsNotEmpty = (req,res,next) => {
  const id = Number(req.params.id)
  console.log("ID checked")
  if (!id) {
    res.status(400).json({
      "message": "The ID is mandatory"
    })
  } else {
    next()
  }
}



module.exports = {
  inputValidation,
  medicExists,
  idIsNotEmpty
}