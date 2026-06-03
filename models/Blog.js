import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;