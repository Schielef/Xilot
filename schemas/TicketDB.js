const { model, Schema } = require('mongoose')

module.exports = model("TicketDB", new Schema({
    GuildID: String,
    ParentID: String,
    SupportID: String
}))