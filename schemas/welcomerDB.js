const { model, Schema } = require('mongoose')

module.exports = model("Welcomer", new Schema({
    GuildID: String,
    ChannelID: String,
}))