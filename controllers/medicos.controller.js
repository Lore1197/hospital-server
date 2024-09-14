//const { json } = require("body-parser");
const {schema} = require('../schema/medic.schema')
const {db} = require('../config/medics')
const {pool} = require('../config/pg')

// NPM


// Get medic

const getMedics = async (req,res) => {
  try {
    // const result = await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(db)
    //   }, 2000);
    // })
    const medics =  await pool.query(
      'SELECT * FROM "Medics".medics_table'
    )
    res.status(200).json({
      "data": medics.rows
    })

  } catch (error) {
    res.status(500).json({
      "message": "Error"
    })
  }
}

// GET medic by ID

const getMedicById = async (req,res) => {
  const id = Number(req.params.id)
  //? Does the id exist?
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const medic = db.find((db)=>{
        return db.id === id
      }) 
      if (medic) {
        resolve(medic)
      } else {
        reject('Not found')
      }
    }, 2000);
  })
  
  try {
    const result = await promise
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({
      "message": error
    })
  }
}

// POST a medic

const postMedic = async (req,res) => {
  //? Input Validation
  const {nombre,apellido,edad,especialidad,dni} = req.body;
  //const result = createMedic(input)
  try {
    const newMedic = await pool.query(
      'INSERT INTO "Medics".medics_table(nombre, apellido,edad,especialidad, dni) VALUES ($1, $2, $3,$4,$5)',
      [nombre,apellido,edad,especialidad,dni]
    )
    console.log(newMedic)
    // const output = await addMedicToDB(result);
    res.status(200).json({
      "message": "ok"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      "message": 'An error was encountered when trying to access the DB'
    }) 
  }
  
}


// PUT 

const putMedic = async (req,res) => {
  const id = Number(req.params.id);
  const newData = req.body;
  
  try {
    const updatedMedic = await updateMedic(id,newData)
    return res.status(200).json({
      "message": "Updated complete"
    })
  } catch (err) {
    return res.status(400).json({
      "message": err
    })
  }
}

// DELETE 

const deleteMedic = async (req,res) => {
  const id = Number(req.params.id)
  //! Searching and deleting medic
  try {
    const result = await deleteMedicFromDB(id)
    console.log(result)
    return res.status(200).json({
      "message": "Medic deleted"
    })
  } catch (error) {
    return res.status(500).json({
      "message": "An error occured"
    })
  }
}

// Extra functions

function createMedic(info) {
  const newMedic = {
    "nombre": info.nombre,
    "apellido": info.apellido,
    "DNI": info.DNI,
    "edad": info.edad,
    "especialidad": info.especialidad
  }
  return newMedic
}

 function updateMedic(id,newInfo) {
    console.log("Updating medic's info...")
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = db.findIndex((i)=>{
          return i.id === id
        })
        db.splice(index,1)
        const medic = {
          "id":id,
          "nombre": newInfo.nombre,
          "apellido": newInfo.apellido,
          "edad": newInfo.edad,
          "especialidad": newInfo.especialidad,
          "dni": newInfo.dni
        }
        db.splice(index,0,medic)
        resolve(db)
      }, 4000);
    })
 }
 
 function addMedicToDB(newMedic) {
   console.log("Adding new medic to the DB...")
   return new Promise((resolve, reject) => {
     setTimeout(() => {
       db.push(newMedic)
       resolve("New medic succesfully added")
     }, 2000);
   })
 
  }

 function deleteMedicFromDB(id) {
  return new Promise((resolve, reject) => {
    console.log("Searching the medic to be deleted...")
    setTimeout(() => {
      const medicIndex = db.findIndex((m)=>{
        return m.id === id
      })
      db.splice(medicIndex,1)
      resolve(db)
    }, 2000);
  })
 }
 

// Exporting section
module.exports = {
  getMedics,
  getMedicById,
  postMedic,
  putMedic,
  deleteMedic
}