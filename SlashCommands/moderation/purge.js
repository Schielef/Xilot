const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purge messages")
        .addStringOption((option) =>
            option
                .setName("amount")
                .setDescription("Amount of messages ")
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
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.editReply({ embeds: [noPermissions], ephemeral: true })

        let deleteAmount = interaction.options.getString('amount')

        interaction.deleteReply()
        const toMuch = new MessageEmbed()
            .setColor("RED")
            .setTitle("Server Info")
            .setDescription('You can only purge up to 99 messages at once')
            .setFooter('Xilot')
        if (deleteAmount > 99) return interaction.channel.send({ embeds: [toMuch], ephemeral: true })


        await interaction.channel.bulkDelete(parseInt(deleteAmount) + 1, true)
        const deletedAmount = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Server Info")
            .setDescription(`deleted ${deleteAmount} messages`)
            .setFooter('Xilot')
        return interaction.channel.send({ embeds: [deletedAmount], ephemeral: true })
        
    },
};