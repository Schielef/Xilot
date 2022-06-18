const { model, Schema } = require('mongoose')

module.exports = model("LevelOnOff", new Schema({
    GuildID: String,
    OnOff: Boolean, 
}))