var lodash = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum,blog) => sum+blog.likes,0)

const favoriteBlog = (blogs) => {
    return (blogs.length===0) 
        ? {} 
        : blogs.reduce((max,blog) => 
            (blog.likes > max.likes) 
                ? ({ title: blog.title,author: blog.author,likes: blog.likes }) 
                : max
        ,{likes:0})
}

const mostBlogs = (blogs) => {
    if (blogs.length===0) return {}
    else{
    const gBlogs = lodash.groupBy(blogs, (each) => each.author)
    const mostBlog = lodash.orderBy(gBlogs,gBlogs.length,'desc')[0]
    return {author:mostBlog[0].author, blogs:mostBlog.length}
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}