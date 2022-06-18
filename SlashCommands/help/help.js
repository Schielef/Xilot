const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("help")
        .setDescription("See all commands and infos about the bot"),


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
                { name: 'Xilot Help Page', value: 'In order to use the Xilot bot, use the prefix, ``/`` followed by the command name! To get help on specific commands join the help discord below.' },
                { name: '⚙️ Setup', value: '``set-joinrole``, ``editlevelsystem``, ``set-ticket-options``, ``set-membercount-channel``, ``set-meme-channel``, ``set-suggestion-channel``, ``set-welcome-channel``, ``set-tempvoice-channel``, ``ticket-pannel``', inline: true },
                { name: '🔧 Moderation', value: '``ban``, ``kick``, ``purge``, ``warn``, ``warns``, ``remove-warn``' },
                { name: '🎉 Giveaways', value: '``ga-start``, ``ga-end``, ``ga-reroll``', inline: true },
                { name: '📈 Level', value: '``rank``, ``leaderboard``', inline: true },
                { name: '🎲 Minigames', value: '``activity-yt``, ``activity-wordssnack``, ``activity-spellcast``, ``activity-sketchheads``, ``activity-betrayal``, ``activity-checkers`` ``activity-chess``, ``activity-fishington``, ``activity-lettertile``, ``activity-ocho``, ``activity-poker``', inline: false },
                { name: '💡 Suggestion', value: '``suggest``', inline: true },
                { name: '📙 Other', value: '``meme``, ``userinfo``, ``permissions``', inline: true },
                { name: 'Xilot', value: '[Invite Me](https://discord.com/api/oauth2/authorize?client_id=924679619137929268&permissions=8&scope=bot%20applications.commands) - [Bot Support](https://discord.gg/XUK6AybPFV) - [Vote for me](https://top.gg/bot/924679619137929268/vote)' }
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/924783776989606000/924783859952918578/static.png')
            .setFooter('Xilot')
            .setTimestamp()
        interaction.channel.send({ embeds: [embed], ephemeral: false })

    },
};