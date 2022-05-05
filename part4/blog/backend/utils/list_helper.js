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

module.exports = {
    dummy, totalLikes, favoriteBlog
}