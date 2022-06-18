const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const Levels = require('discord-xp');


module.exports = {
    ...new SlashCommandBuilder()
        .setName("rank")
        .setDescription("See the level rank from a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User to see rank of")
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

        const levels = await Levels.fetch(user.id, interaction.guildId);

        if (!levels) {
            interaction.deleteReply()
            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle('Level')
                .setDescription(`Mentioned user dose not have any XP`)
                .setFooter('Xilot')
            return interaction.channel.send({ embeds: [embed], ephemeral: true })
        }
        interaction.deleteReply()
        const embed2 = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Level')
            .setDescription(`${user} has ${levels.xp} XP and is on level ${levels.level}`)
            .setFooter('Xilot')
        return interaction.channel.send({ embeds: [embed2], ephemeral: true })

    },
};