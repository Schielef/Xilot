const { model, Schema } = require('mongoose')

module.exports = model("onJoinDB", new Schema({
    GuildID: String,
    RoleID: String
}))