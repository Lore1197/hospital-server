const Joi = require("joi");


const schema = Joi.object({
  "nombre": Joi.string().max(25).required(),
  "apellido": Joi.string().max(25),
  "edad": Joi.number().required(),
  "especialidad": Joi.string().min(7).max(30).required(),
  "dni": Joi.number().required()
})


module.exports = {
  schema
}