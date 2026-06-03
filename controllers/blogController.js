// import Blog from '../models/Blog.js';

// export const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find()
//       .populate('author', 'name email')
//       .sort('-createdAt');
    
//     res.json({
//       success: true,
//       count: blogs.length,
//       blogs
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const getUserBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find({ author: req.userId })
//       .populate('author', 'name email')
//       .sort('-createdAt');
    
//     res.json({
//       success: true,
//       count: blogs.length,
//       blogs
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const getSingleBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id)
//       .populate('author', 'name email');
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       blog
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const createBlog = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : null;
    
//     const blog = await Blog.create({
//       title,
//       content,
//       image,
//       author: req.userId
//     });
    
//     await blog.populate('author', 'name email');
    
//     res.status(201).json({
//       success: true,
//       blog
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const updateBlog = async (req, res) => {
//   try {
//     let blog = await Blog.findById(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }
    
//     if (blog.author.toString() !== req.userId) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden - You can only edit your own blogs'
//       });
//     }
    
//     const { title, content } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : blog.image;
    
//     blog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { title, content, image },
//       { new: true, runValidators: true }
//     ).populate('author', 'name email');
    
//     res.json({
//       success: true,
//       blog
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const deleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }
    
//     if (blog.author.toString() !== req.userId) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden - You can only delete your own blogs'
//       });
//     }
    
//     await blog.deleteOne();
    
//     res.json({
//       success: true,
//       message: 'Blog deleted successfully'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };








// backend/controllers/blogController.js
import Blog from '../models/Blog.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's blogs
// @route   GET /api/blogs/my-blogs
// @access  Private
export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userId })
      .populate('author', 'name email')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
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
// @route   POST /api/blogs
// @access  Private
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    
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

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
export const updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden - You can only edit your own blogs'
      });
    }
    
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : blog.image;
    
    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true, runValidators: true }
    ).populate('author', 'name email');
    
    res.json({
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

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden - You can only delete your own blogs'
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