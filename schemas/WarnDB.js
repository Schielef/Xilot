const { model, Schema } = require('mongoose')

module.exports = model("warndb", new Schema({
    guildid: String,
    user: String,
    content: Array
}))