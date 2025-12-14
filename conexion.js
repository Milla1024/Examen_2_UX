const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" }); 

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("No se encontró la variable MONGO_URI en .env.local");
  process.exit(1);
}

const client = new MongoClient(MONGO_URI);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("examen_backend"); 
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error("Debe conectarse a la base de datos primero");
  return db;
}

module.exports = { connectDB, getDB };