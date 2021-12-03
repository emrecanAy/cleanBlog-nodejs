const Blog = require('../models/Blog');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPostPage = (req, res) => {
  res.render('add_post');
};

exports.getEditPage = async (req, res) => {
  const post = await Blog.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
};

exports.getPostPage = (req, res) => {
  res.render('post');
};
