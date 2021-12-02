const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');
const path = require('path');

const Blog = require('./models/Blog');
const { RSA_NO_PADDING } = require('constants');

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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routes
app.get('/', async (req, res) => {
  const blogs = await Blog.find({}).sort('-dateCreated');
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

app.get('/posts/edit/:id', async (req, res) => {
  const post = await Blog.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.get('/posts/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('post', {
    blog,
  });
});

app.put('/posts/:id', async (req, res) => {
  const post = await Blog.findOne({ _id: req.params.id });
  console.log(req.params.id); //sorunsuz geliyor.
  console.log(req.body); //boş obje dönüyor.
  post.title = req.body.title;
  post.detail = req.body.detail;

  post.save();

  res.redirect(`/posts/${req.params.id}`);
});

app.post('/posts', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port:${port}'de yayınlandı...`);
});
