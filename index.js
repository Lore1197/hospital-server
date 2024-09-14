// NPM

const express = require('express');
const server = express();
const medicRoutes = require('./routes/medicos.route')
const usuariosRoutes = require('./routes/usuarios.route')
const authenticationRoutes = require('./routes/authentication.route')
const{serverConnection} = require('./config/pg')


// Server

server.get('/',(req,res)=>{
  res.send('Server is running')
})

// Middleware
server.use(express.json());

// APIs

server.use('/api/medics',medicRoutes)
server.use('/api/usuarios',usuariosRoutes)
server.use('/api/authentication',authenticationRoutes)

// Port

const port = process.env.port || 8080;
serverConnection()
server.listen(port,()=>{
  console.log(`Listening to port: ${port}`);
})



