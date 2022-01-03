const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    var amount = 0
    const reducer = (sum, counter) => {
        return sum + counter
    }

    if(blogs.length === 0) {
        return blogs.length === 0
        ? 0
        : likes.reduce(reducer) / blogs.length
    } else {
        for(i=0; i<blogs.length; i++ ) {
            const object = blogs[i]
            const total = object.likes
            amount = amount + total
        }
    }
    return amount
}

const favoriteBlog = (blogs) => {

    var winner = blogs[0]

    for(var i=0; i<blogs.length; i++) {
        var winValue = blogs[0]
        const object = blogs[i]
        const likes = object.likes
        const object2 = blogs[i++]
        const likes2 = object2.likes
        
        if(likes >= likes2) {
            winValue = object
        } else {
            winValue = object2
        }
        
        if(winner.likes < winValue.likes) {
            winner = winValue
        }
    } 

    return winner
}

const blogIdentifier = (blogs) => {
    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    blogIdentifier,
}