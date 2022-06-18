const { model, Schema } = require('mongoose')

module.exports = model("memberCountDB", new Schema({
    GuildID: String,
    ChannelID: String
}))