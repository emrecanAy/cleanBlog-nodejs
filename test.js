const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//db connection
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const Blog = mongoose.model('Blog', BlogSchema);

//create a photo
// Blog.create({
//   title: 'Test Blog Title 1',
//   detail: 'Test blog decription lorem ipsum.',
// });

//read photos
// Blog.find({}, (err, data) => {
//     console.log(data);
// })

//