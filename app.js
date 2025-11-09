const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');

require('./config/passportConfig');

const app = express();

// --- Middleware ---
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'tp2_secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// --- MongoDB ---
mongoose.connect('mongodb://127.0.0.1:27017/tp2_auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// --- Routes ---
app.use('/', require('./routes/authRoutes'));
app.use('/books', require('./routes/bookRoutes'));

// --- Start Server ---
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
// Redirection par défaut
app.get('/', (req, res) => {
  res.redirect('/login');
});
