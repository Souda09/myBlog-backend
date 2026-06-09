import Blog from '../models/Blog.js';

// @desc    Get all blogs (public)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort('-createdAt');
    
    res.json({
      success: true,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get ONLY current user's blogs (private)
export const getUserBlogs = async (req, res) => {
  try {
    // ✅ Sirf current user ke blogs find karo
    const blogs = await Blog.find({ author: req.userId })
      .populate('author', 'name email')
      .sort('-createdAt');
    
    console.log(`Found ${blogs.length} blogs for user: ${req.userId}`);
    
    res.json({
      success: true,
      blogs
    });
  } catch (error) {
    console.error('Error in getUserBlogs:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single blog
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email');
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : null;
    
    const blog = await Blog.create({
      title,
      content,
      image,
      author: req.userId
    });
    
    await blog.populate('author', 'name email');
    
    res.status(201).json({
      success: true,
      blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update blog (only if owner)
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // ✅ Check if user is the author
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own blogs'
      });
    }
    
    const { title, content } = req.body;
    const image = req.file ? req.file.path : blog.image;
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true }
    ).populate('author', 'name email');
    
    res.json({
      success: true,
      blog: updatedBlog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete blog (only if owner)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // ✅ Check if user is the author
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own blogs'
      });
    }
    
    await blog.deleteOne();
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};