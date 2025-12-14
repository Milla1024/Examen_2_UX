const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectDB, getDB } = require("./conexion");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
console.log(getDB);
//crud
/*
create, listar, editar, delete
*/ 

// post de create


// post de listar


// post de editar


// post de eliminar

