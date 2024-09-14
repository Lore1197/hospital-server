const express = require('express')
const router = express.Router()
const {usuarios} = require('../config/usuarios')
// Routes

router.get('/',(req,res)=>{
  res.status(200).send(usuarios)
})

router.get('/:id',(req,res)=>{

})

router.post('/',(req,res)=>{
  res.status(200).send(usuarios)
})

router.put('/:id',(req,res)=>{

})

router.delete('/:id',(req,res)=>{

})

module.exports = router