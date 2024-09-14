// NPM

const express = require('express');
const router = express.Router();

const {getMedics,getMedicById,postMedic,putMedic,deleteMedic} = require('../controllers/medicos.controller');

const {inputValidation,medicExists,idIsNotEmpty} = require('../middleware/medics.validation');
const { checkAuth } = require('../middleware/authorization.validation');
const {checkToken} = require('../middleware/checktoken.validation')

// GET all medics

router.get('/',getMedics)

// GET medic by ID

router.get('/:id',checkAuth,idIsNotEmpty,getMedicById)

// POST 

router.post('/',inputValidation,medicExists,postMedic)

// PUT

router.put('/:id',inputValidation,putMedic)

// DELETE

router.delete('/:id',idIsNotEmpty,deleteMedic)


module.exports = router;