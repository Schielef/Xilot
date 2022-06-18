const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const ms = require('ms')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("ga-reroll")
        .setDescription("Reroll a giveaway")
        .addStringOption((option) =>
            option
                .setName("ga_message_id")
                .setDescription("Giveaway Message ID")
                .setRequired(true)
        ),


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        const noPermissions = new MessageEmbed()
            .setColor('RED')
            .setTitle('Server Info')
            .setDescription("You need MANAGE_MESSAGES permissions to use this command")
            .setFooter('Xilot')
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.channel.editReply({ embeds: [noPermissions], ephemeral: true }) 
        


        const messageId = interaction.options.getString('ga_message_id')

        client.giveaways.reroll(messageId).then(() => {
            interaction.deleteReply()
            const reroll = new MessageEmbed()
                .setColor('AQUA')
                .setTitle('Server Info')
                .setDescription(`Giveaway rerolled!`)
                .setFooter('Xilot')
            interaction.channel.send({ embeds: [reroll], ephemeral: true })
        }).catch(error => {
            console.error(error)
            interaction.deleteReply()
            const errorMessage = new MessageEmbed()
                .setColor('RED')
                .setTitle('Server Info')
                .setDescription('An error occurred')
                .setFooter('Xilot')
            interaction.channel.send({ embeds: [errorMessage], ephemeral: true })
        })

    },
};