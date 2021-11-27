const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

// GET All /api/blogs
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

// Create One /api/blogs
blogsRouter.post("/", (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    created: Date.now(),
    modified: Date.now(),
  });
  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

// GET One /api/blogs/:id
blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Update One /api/blogs/:id
blogsRouter.put("/:id", (request, response, next) => {
  const blog = { ...request.body, modified: Date.now() };
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => response.json(updatedBlog))
    .catch((error) => next(error));
});

// Delete One /api/blogs/:id
blogsRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
