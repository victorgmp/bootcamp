const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // if ( blogs.length===0) {
  //   return 0
  // }
  // let sum = 0
  // blogs.forEach(blog => sum += blog.likes)
  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

// return the MAX
// const favoriteBlog = (blogs) => {
//   return Math.max(...blogs.map(blog => blog.likes))
// }

// return the object with MAX
const favoriteBlog = (blogs) => {
  // if ( blogs.length===0) {
  //   return null
  // }
  return blogs.reduce(
    (prev, curr) => (prev.likes > curr.likes ? prev : curr)
  )
}

const mostBlogs = (blogs) => {
  const result = blogs.reduce((a, b) => {

    let popular = a.find(found => found.author === b.author)
    if (!popular) {
      return a.concat({ author: b.author, blogs: 1 })
    }

    popular.blogs++
    return a
  }, [])

  return result.reduce((a, b) => (a.blogs > b.blogs ? a : b))
}

const mostLikes = (blogs) => {
  const result = blogs.reduce((a, b) => {
    let index = 0
    let popular = a.find(found => found.author === b.author)
    if (!popular) {
      return a.concat({ author: b.author, likes: b.likes })
    }

    popular.likes += b.likes
    return a
  }, [])
  return result.reduce((a, b) => (a.likes > b.likes ? a : b))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
