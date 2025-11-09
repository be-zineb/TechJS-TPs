import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Book from "./models/Book.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connexion à MongoDB local
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté localement"))
  .catch(err => console.error(" Erreur MongoDB:", err));

// Ajouter un livre
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//  Liste de tous les livres
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

//  Supprimer un livre
app.delete("/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Livre supprimé" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Serveur backend sur le port ${PORT}`));
