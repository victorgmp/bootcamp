const listHelper = require('../utils/list_helper')

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const blogs = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculates right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('return favorite blog', () => {
    const favorite = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    const result = (listHelper.favoriteBlog(blogs))
    expect(result).toEqual(favorite)
  })
})

describe('most blogs', () => {
  test('return author with most blogs', () => {
    const most = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    const result = (listHelper.mostBlogs(blogs))
    expect(result).toEqual(most)
  })
})

describe('most likes', () => {
  test('return author with most likes', () => {
    const most = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }


    const result = (listHelper.mostLikes(blogs))
    expect(result).toEqual(most)
  })
})
