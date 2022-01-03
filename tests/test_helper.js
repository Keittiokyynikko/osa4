const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Testibloga",
        author: "Jack Kennedy",
        url: "https://www.testiblogi.com",
        likes: 10
    },
  ]

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  module.exports = {
    blogsInDb,
    initialBlogs,
    usersInDb,
}