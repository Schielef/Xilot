const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("permissons")
        .setDescription("See all permissions for each command"),


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.deleteReply()
        const embed = new MessageEmbed()
            .setColor('RED')
            .addFields(
                
                { name: '⚙️ Setup', value: 'For all Setup commands you need ADMINISTRATOR permissions`', inline: true },
                { name: '🔧 Moderation', value: '``ban (BAN_MEMBERS)``, ``kick (KICK_MEMBERS)``, ``purge (MANAGE_MESSAGES)``, ``warn (MANAGE_MESSAGES)``, ``warns``, ``remove-warn (MANAGE_MESSAGES)``' },
                { name: '🎉 Giveaways', value: '``ga-start (BAN_MEMBERS)``, ``ga-end (BAN_MEMBERS)``, ``ga-reroll (BAN_MEMBERS)``', inline: true },
                { name: '📈 Level', value: '``rank``, ``leaderboard``', inline: true },
                { name: '💡 Suggestion', value: '``suggest``', inline: true },
                { name: '📙 Other', value: '``meme``, ``userinfo``', inline: true },
                { name: 'Xilot', value: '[Invite Me](https://discord.com/api/oauth2/authorize?client_id=924679619137929268&permissions=8&scope=bot%20applications.commands) - [Bot Support](https://discord.gg/XUK6AybPFV) - [Vote for me](https://top.gg/bot/924679619137929268/vote)' }
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/924783776989606000/924783859952918578/static.png')
            .setFooter('Xilot')
            .setTimestamp()
        interaction.channel.send({ embeds: [embed], ephemeral: false })

    },
};