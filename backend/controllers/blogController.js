import asyncHandler from 'express-async-handler';
import Blog from '../models/blog.js';

// @desc Create a blog
// @route POST /api/blogs
// @access Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    user: req.user._id,
    image: req.body.image,
    content: req.body.content
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc Get blogs
// @route GET /api/blogs
// @access Private/admin
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).populate('user', 'id name');

    res.json(blogs);
});

// @desc Get blog by ID
// @route GET /api/blogs/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', 'name email');

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc Delete a blog
// @route DELETE /api/blogs/:id
// @access Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.remove();
    res.json({
      message: 'Blog removed'
    })
  } else {
    res.status(404);
    throw new Error('Blog not found!');
  }
});

// @desc Update a blog
// @route PATCH /api/blogs/:id
// @access Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const {
    title,
    content
  } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.content = content;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found!');
  }
});

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
