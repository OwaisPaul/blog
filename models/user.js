
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    } ,
    name: String,
    passwordHash: String,
    // the ids of the blogs are stored within the user document as an array of Mongo ids
    // user has an array of references to all the notes created by them
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})
    userSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject._v
            delete returnedObject.passwordHash // password should not be revealed
        }
    })

    const User = mongoose.model('User', userSchema)

    module.exports = User 