const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs identifier is called id', async () => {
    const blogs = await api.get('/api/blogs')
    const pieces = blogs.body.map(r => r.id)
    expect(pieces).toBeDefined()
})

test('blogs can be added', async () => {
    const newBlog = {
        title: "Testiblogi",
        author: "Joseph Garfield",
        url: "https://www.testiblogi.fi",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('like without value is 0', async () => {
    const newBlog = {
        title: "Testiblogi",
        author: "Joseph Garfield",
        url: "https://www.testiblogi.fi",
        likes: null
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const counter = blogsAtEnd.length
    const addedBlog = blogsAtEnd[counter - 1]
    const amLikes = addedBlog.likes
    expect(amLikes).toEqual(0)
})

test('blog without title and url is wrong', async () => {
    const newBlog = {
        title: null,
        author: "George Harrison",
        url: null,
        likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    

})

test('blogs can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
      
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length - 1
        )
      
        const contents = blogsAtEnd.map(r => r.content)
      
        expect(contents).not.toContain(blogToDelete.content)
})

test('likes can be modified', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToMod = blogsAtStart[0]

    const newBlog = {
        title: "Well hello",
        author: "George Harrison",
        url: "https://www.testiblogi.fi",
        likes: 12
    }

    await api
    .put(`/api/blogs/${blogToMod.id}`, newBlog, {new:true})
    .expect(200)


    const processedBlogToView = JSON.parse(JSON.stringify(blogToMod))

    expect(blogToMod).toEqual(processedBlogToView)
})

afterAll(() => {
    mongoose.connection.close()
})