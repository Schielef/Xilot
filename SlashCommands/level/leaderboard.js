const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const Levels = require('discord-xp');


module.exports = {
    ...new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Leaderboard of the top 10 Users rank"),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        const lead = await Levels.fetchLeaderboard(interaction.guild.id, 10)
        if (lead.length < 1) return interaction.channel.send('No leaderboard found')
        const led = await Levels.computeLeaderboard(client, lead, true);
        const lb = led.map(
            (e) =>
                `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level
                }\nXP: ${e.xp.toLocaleString()}`
        );
        interaction.deleteReply()
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${lb.join("\n\n")}`)
            .setFooter('Xilot')
        interaction.channel.send({ embeds: [embed], ephemeral: false })

    },
};