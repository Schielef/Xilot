const { Client, CommandInteraction, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')


module.exports = {
    ...new SlashCommandBuilder()
        .setName("ticketpannel")
        .setDescription("Spawn a ticket-pannel"),

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
            .setDescription("You need ADMINISTRATOR permissions to use this command")
            .setFooter('Xilot')
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.editReply({ embeds: [noPermissions], ephemeral: true })
        interaction.deleteReply()
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Ticket System')
            .setDescription('To create a Ticket **press the button**')
            .setFooter('Xilot')

        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('openticket')
                    .setLabel('🪁| Create Ticket')
                    .setStyle('PRIMARY')
            )

        interaction.channel.send({ embeds: [embed], components: [row1], ephemeral: false })


    },
};