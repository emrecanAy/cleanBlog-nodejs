const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');
const path = require('path');

const Blog = require('./models/Blog');
const postsController = require('./controllers/postsController');
const pagesController = require('./controllers/pagesController');

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
app.get('/', postsController.getAllPosts);
app.get('/posts/:id', postsController.getPost);
app.post('/posts', postsController.createPost);
app.put('/posts/:id', postsController.updatePost);
app.delete('/posts/:id', postsController.deletePost)

app.get('/about', pagesController.getAboutPage);
app.get('/add_post', pagesController.getAddPostPage);
app.get('/posts/edit/:id', pagesController.getEditPage);
app.get('/post', pagesController.getPostPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port:${port}'de yayınlandı...`);
});
