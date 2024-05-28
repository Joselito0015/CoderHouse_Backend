const User = require('../models/user.model');

class userDao {
    find = async () => {
        try {
            const users = await User.find().lean()
            return users
        }
        catch (error) {
            return error
        }
    }

    create = async (user) => {
        try {
            const response = await User.create(user);
            return response
        }
        catch (error) {
            return error
        }
    }

    findOne = async (filter) => {
        try {
            const user = await User.findOne(filter).lean()
            return user
        }
        catch (error) {
            return error
        }
    }
    
    deleteOne = async (_id) => {
        const filter = { "_id": _id };
        try {
            const response = await User.deleteOne(filter)
            return response
        }
        catch (error) {
            return error
        }
    }

    updateOne = async (_id, user) => {
        const filter = { "_id": _id };
        try {
            const response = await User.updateOne(filter, user)
            return response
        }
        catch (error) {
            return error
        }
    }
}

module.exports = userDao
