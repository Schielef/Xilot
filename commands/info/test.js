const { Message, Client } = require("discord.js");

module.exports = {
    name: "test",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send(`test2`);
    },
};
