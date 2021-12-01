const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');

const Blog = require('./models/Blog');

const app = express();

//db connection
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', {
    blogs,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.post('/posts', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port:${port}'de yayınlandı...`);
});
