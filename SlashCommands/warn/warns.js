const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/WarnDB')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("warns")
        .setDescription("See all warns of a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User to see warns of")
                .setRequired(true)

        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {




        const user = interaction.options.getUser('user');


        db.findOne({ guildid: interaction.guild.id, user: user }, async (err, data) => {
            if (err) throw err;
            if (data) {
                const map = data.content.map(
                    (w, i) =>
                        `\`${i + 1}\` | Reason : ${w.reason}`
                )

                interaction.deleteReply()
                const embed1 = new MessageEmbed()
                    .setTitle(`${user.username}'s warns`)
                    .setDescription(map.join('\n'))
                    .setColor("BLUE")
                    .setFooter('Xilot')
                interaction.channel.send({ embeds: [embed1], ephemeral: false })

            } else {
                interaction.deleteReply()
                interaction.channel.send({ content: 'User has no data', ephemeral: true })
            }
        })
    },
};