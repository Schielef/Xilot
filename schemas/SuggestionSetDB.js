const { model, Schema } = require('mongoose')

module.exports = model("SuggestionSetDB", new Schema({
    GuildID: String,
    SendToID: String,
    CreatedID: String,
}))