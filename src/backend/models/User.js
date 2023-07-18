const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    SteamID: {
        type: Number,
        required: true
    },
    ProfilePic: {
        type: String,
        required: false
    },
    Listings: {
        type: 
            [{
            ItemsToTradeImage: [ // to oerwrite add another set of brackets after colon and introduce key of type and add default aftre comma
                String
            ],
            ItemsToTradeText: [
                String
            ],
            Notes: {
                type: String,
                required: false
            },
            ItemsToReceiveImage: [
                String
            ],
            ItemsToReceiveText: [
                String
            ]
            }],
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)