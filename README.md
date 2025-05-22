explanation of the loop

 for (const blog of blogs) {
    blogCount[blog.author] = (blogCount[blog.author] || 0) + 1
  }

   looping through an array of blog objects. For each blog, you're:

Accessing the author: blog.author

Looking up how many times that author has already been seen: blogCount[blog.author]

If the author hasn’t been seen yet, you treat it as 0: (blogCount[blog.author] || 0)

You add 1 to that count.

You store the result back in blogCount[blog.author]