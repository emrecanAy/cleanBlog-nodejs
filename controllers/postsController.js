const Blog = require('../models/Blog');

exports.getAllPosts = async (req, res) => {
  const blogs = await Blog.find({}).sort('-dateCreated');
  res.render('index', {
    blogs,
  });
};

exports.getPost = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('post', {
    blog,
  });
};

exports.createPost = async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const post = await Blog.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;

  post.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
