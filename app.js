const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectDB, getDB } = require("./conexion");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


connectDB();
console.log(getDB);
//crud
/*
create, listar, editar, delete
*/ 

// post de create
app.post("/createPost", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    if (!title || !content || !authorId) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const db = getDB();
    const result = await db.collection("posts").insertOne({
      title,
      content,
      authorId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ mensaje: "Post creado exitosamente en mondongo", titulo: title, contenido: content, autor: authorId});
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el post", error: error.message });
  }
});

// post de listar


// post de editar


// post de eliminar

