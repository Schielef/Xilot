const { model, Schema } = require('mongoose')

module.exports = model("TempVoiceDB", new Schema({
    GuildID: String,
    ParentID: String,
    ChannelID: String,
}))