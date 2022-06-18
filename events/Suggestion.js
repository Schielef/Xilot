const { ButtonInteraction } = require('discord.js')
const DB = require('../schemas/suggestDB')
const client = require('../index')

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return
    if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You cannot use this button", ephemeral: true })

    const { guildId, customId, message } = interaction;

    DB.findOne({ GuildID: guildId, MessageID: message.id }, async (err, data) => {
        if (err) throw err;


        const Embed = message.embeds[0];
        if (!Embed) return;

        switch (customId) {
            case "suggest-accept": {
                Embed.fields[2] = { name: "Status:", value: "Accepted", inline: true }
                message.edit({ embeds: [Embed.setColor("GREEN")] })
                interaction.reply({ content: "Suggestion Accepted", ephemeral: true })
            }
                break;
            case "suggest-decline": {
                Embed.fields[2] = { name: "Status:", value: "Declined", inline: true }
                message.edit({ embeds: [Embed.setColor("RED")] })
                interaction.reply({ content: "Suggestion Declined", ephemeral: true })
            }
                break;
            case "suggest-done": {
                Embed.fields[2] = { name: "Status:", value: "DONE", inline: true }
                message.edit({ embeds: [Embed.setColor("YELLOW")] })
                interaction.reply({ content: "Suggestion Finished", ephemeral: true })
            }
                break;
        }
    })
})