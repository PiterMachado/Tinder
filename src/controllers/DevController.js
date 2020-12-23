const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
    async store(req, res){

        try {
            const { username } = req.body

            const userExists = await Dev.findOne({ user: username })

            if(userExists){
                return res.json(userExists)
            }

            const response = await axios.get(`https://api.github.com/users/${username}`)
    
            const { name, bio, avatar_url } = response.data
    
            const dev = await Dev.create({
                fullName: name,
                user: username,
                bio,
                avatar: avatar_url
            })
    
            return res.json(dev) 

        } catch (error) {
            return res.json(error) 
        }

        
    },

    async index(req, res){

        try {
            const { user } = req.headers

            const loggedDev = await Dev.findById(user)

            const users = await Dev.find({
                $and:[
                    { _id: { $ne: user } },
                    { _id: { $nin: loggedDev.likes } },
                    { _id: { $nin: loggedDev.dislikes } },
                ],
            })
    
            return res.json(users) 

        } catch (error) {
            return res.json(error) 
        }

        
    }
}