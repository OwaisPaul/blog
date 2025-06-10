const { test, describe, before, after } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const Blog = require('../../models/blog')
const listHelper = require('../../utils/list_helper')

const api = supertest(app)

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
}) 

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('totalLikes sums likes for multiple blogs', () => {

    const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]   
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
    const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 20,
    __v: 0
  }  
]

    test('blog with maximum likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {
     _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 20,
    __v: 0
  }  
         )
    })
})

describe('mostBlogs', () => {
    const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 20,
    __v: 0
  }  
]
  test('this author has max blogs', () => {
    const result = listHelper.mostBlogs(blogs)

    const validResults = [
        {author: "Robert C. Martin", blogs: 2},
        {author: "Edsger W. Dijkstra",blogs: 2}
    ]
    const match = validResults.find(r => 
        r.author === result.author && r.blogs === result.blogs
    )
    assert.ok(match, 'Returned author is not one of the expected results')
  })
})

describe('most liked', () => {
    const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 22,
    __v: 0
  }  
]

    test('author most liked ', () => {
        const result = listHelper.mostLikes(blogs)
        const expected = {
    author: "Robert C. Martin",
    likes: 32,
  }
  assert.deepStrictEqual(result, expected)
    })
})

describe('Blog List Tests, step 1', () => {
test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

})

describe('Blog List Tests, step 2', () => {
  test('blog posts have a field name id instead of _id', async() => {
    const response = await api
       .get('/api/blogs')
       .expect(200).expect('Content-Type', /application\/json/)

       const blogs = response.body
       blogs.forEach(blog => {
        assert.ok(blog.id !== undefined, 'blog.id should be defined')
        // passes only if blog.id is not undefined
        assert.strictEqual(blog._id, undefined, 'blog._id should be undefined')
        // passes only if blog._id === undefined
        //this checks that the original MongoDB field _id is gone.

       })
})
})

describe('Blog List Tests, step 3', () => {
const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com/1',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com/2',
    likes: 12,
  }
]
  before(async () => {
    await Blog.deleteMany({}) // cleans the collection
    await Blog.insertMany(initialBlogs) // adds initial known data
  })
    
   test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Fullstack open',
      author: 'University of helsinki',
      url: 'http://fulstackopen.com',
      likes: 33,
    }
     const response = await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
// in order to verify the content of the newly added blog post is 
// saved correctly to the database 
     const  getResponse = await api.get('/api/blogs')
     assert.strictEqual(getResponse.body.length, initialBlogs.length + 1)
      const titles = getResponse.body.map(b => b.title)
      assert.ok(titles.includes('Fullstack open'))
   
   })
    })

    describe('Blog List Tests, step 4', () => {
   before(async () => {
  await Blog.deleteMany({})
 })

  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'jabbar',
      author: 'ram',
      url: 'http://jacob.com'
      // likes property missing
    }
    const response = await api 
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
          assert.strictEqual(response.body.likes, 0)
  })  
    })

    describe('Blog List tests, step 5', () => {
      before(async () => {
  await Blog.deleteMany({})
 })
  
   test('if the title/url is missing respond with 400', async() => {
     const newBlog = {
        // title: 'freecodeCamp',
        author: 'Quincy Larson',
        // url: 'http://freecodeCamp.com',
        likes: 22,
      }
      const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
          .expect('Content-Type', /application\/json/)  
   })
      })

    describe('Blog List Expansions, step1', () => {
      const newBlog = {
        title: 'blog',
        author: 'bob',
        url: 'http://delete.me',
        likes: 10
      }
      
      let blogId = null

      before(async () => {
        await Blog.deleteMany({})

        const result = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

          blogId = result.body.id
      })
      test('successfully deletes a blog by valid id', async() => {
         await api
            .delete(`/api/blogs/${blogId}`)
            .expect(204)
            

            const response = await api.get('/api/blogs')
            const ids = response.body.map(b => b.id ?? b._id) // fallback to _id if id not present

            assert.ok(!ids.includes(blogId), 'Blog ID should not exist after deletion')
      })
      test(' when blog does not exist', async () => {
        await api
          .delete(`/api/blogs/${blogId}`) // blog already deleted in previous test
          .expect(404)
      })
  
    })

    describe('Blog List Expansions, step 2', () => {
      let blogToUpdate

      before(async () => {
        await Blog.deleteMany({})

        const blog = new Blog({
          title: 'book',
          author: 'nietzsche',
          url: 'http://book.com',
          likes: 44
        })

        blogToUpdate = await blog.save()

      })

      test('updates likes in a blog', async () => {
        const newData = {
          likes: 50
        }

          const response = await api
              .put(`/api/blogs/${blogToUpdate.id}`)
              .send(newData)
              .expect(200)
              .expect('Content-Type', /application\/json/)

          assert.strictEqual(response.body.likes, 50)
      })
      test('return 404 if blog does not exist', async () => {
        const notThereId = new mongoose.Types.ObjectId()

        await api
            .put(`/api/blogs/${notThereId}`)
            .send({likes: 70})
            .expect(404)
      })
       after(async() => {
         await mongoose.connection.close()
})
    })