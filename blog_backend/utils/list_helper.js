const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return  blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const newBlogs = blogs.map(({_id,__v, url,...rest}) => rest)
    return newBlogs.find(blog => blog.likes === maxLikes)
}
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}