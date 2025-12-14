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

    res.status(201).json({ mensaje: "Post creado exitosamente en mondongo", postId: result.insertedId});
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el post", error: error.message });
  }
});

// post de listar
app.get("/listPost", async (req, res) => {
  try {
    const db = getDB();
    const posts = await db.collection("posts").find().toArray();
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener posts" });
  }
});

// post de editar
app.put("/editPost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, authorId } = req.body;

    const db = getDB();
    const result = await db.collection("posts").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content, authorId, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ mensaje: "Post no encontrado" });
    }

    res.json({ mensaje: "Post actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el post" });
  }
});

// post de eliminar
app.delete("/deletePost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const result = await db.collection("posts").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ mensaje: "Post no encontrado" });
    }

    res.json({ mensaje: "Post eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el post" });
  }
});
