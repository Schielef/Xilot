const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const ms = require('ms')
const messages = require("./messages")

module.exports = {
    ...new SlashCommandBuilder()
        .setName("ga-start")
        .setDescription("Start a giveaway")
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("Wich channel the giveaway should be in")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("time")
                .setDescription("How long the giveaway should be")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("amount")
                .setDescription("Amount of winners")
                .setRequired(true)
        ).addStringOption((option) =>
            option
                .setName("prize")
                .setDescription("The prize")
                .setRequired(true)
        ),


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        const channel = interaction.options.getChannel('channel');
        const time = interaction.options.getString('time')
        const amount = interaction.options.getString('amount')
        const winnerCount = Number(amount)
        const prize = interaction.options.getString('prize')

        const noPermissions = new MessageEmbed()
            .setColor('RED')
            .setTitle('Server Info')
            .setDescription("You need MANAGE_MESSAGES permissions to use this command")
            .setFooter('Xilot')
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.editReply({ embeds: [noPermissions], ephemeral: true })

        client.giveaways.start(channel, {
            duration: ms(time),
            prize: prize,
            winnerCount,
            messages
        }).then((gData) => {
            console.log(gData)
        })

        interaction.deleteReply()


        const starting = new MessageEmbed()
            .setColor('AQUA')
            .setTitle('Server Info')
            .setDescription(`Giveaway is starting in ${channel}`)
            .setFooter('Xilot')
        interaction.channel.send({ embeds: [starting], ephemeral: true })





    },
};