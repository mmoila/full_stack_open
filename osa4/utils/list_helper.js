

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.lenth === 0) {
    return 0
  }
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}