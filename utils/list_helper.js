
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)
         return null
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const topBlogs = blogs.filter(blog => blog.likes === maxLikes)
    return topBlogs[0]    // this returns one of the tied blogs
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return null
    const blogCount = {}
  
    for (const blog of blogs) {
        // "Use blogCount[blog.author] if it's truthy (has a value), otherwise use 0"
        blogCount[blog.author] = (blogCount[blog.author]  || 0) + 1
    }
    let topAuthor = null
    let maxBlogs = 0
    
    for (const author in blogCount) {
        if (blogCount[author] > maxBlogs) {
            maxBlogs = blogCount[author]
            topAuthor = author
        }
    }
     
    return {
        author: topAuthor,
        blogs: maxBlogs
    }
}

     const mostLikes = (blogs) => {
        if (blogs.length === 0) return null

        const likeCount = {};

        for (const blog of blogs) {
            likeCount[blog.author] = (likeCount[blog.author] || 0) + blog.likes;
        }
        let mostLiked = null;
        let maxLikes = 0;

        for (const author in likeCount) {
            if (likeCount[author] > maxLikes) {
                maxLikes = likeCount[author];
                mostLiked = author;
            }
        }
        return {
            author: mostLiked,
            likes: maxLikes
        }
     }


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}