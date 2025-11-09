const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


const books = [
  { title: '1984', author: 'George Orwell' },
  { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry' },
  { title: 'Dune', author: 'Frank Herbert' }
];

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/', isAuthenticated, (req, res) => {
  res.render('books', { books, user: req.user });
});

module.exports = router;


// --- Afficher la liste des livres ---
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('books', { books });
  } catch (err) {
    console.error(err);
    res.send("Erreur lors du chargement des livres");
  }
});

// --- Afficher le formulaire d’ajout de livre ---
router.get('/add', (req, res) => {
  res.render('addBook');
});

// --- Ajouter un livre (formulaire POST) ---
router.post('/add', async (req, res) => {
  const { title, author } = req.body;
  try {
    await Book.create({ title, author });
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.send("Erreur lors de l'ajout du livre");
  }
});

// --- Supprimer un livre ---
router.get('/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.send("Erreur lors de la suppression");
  }
});

module.exports = router;
