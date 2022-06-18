const { model, Schema } = require('mongoose')

module.exports = model("MemeChannel", new Schema({
    GuildID: String,
    ChannelID: String
}))