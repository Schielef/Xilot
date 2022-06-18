const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User to ban")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("Reason for the ban")
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
            .setDescription("You need BAN_MEMBERS permissions to use this command")
            .setFooter('Xilot')
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.editReply({ embeds: [noPermissions], ephemeral: true })

        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason')


        await member.ban({
            reason: reason,
            days: 7,
        }).then(() => {
            interaction.deleteReply()
            const bannedEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle('Server Info')
                .setDescription(`banned ${user}\nreason: ${reason}`)
                .setFooter('Xilot')
            interaction.channel.send({ embeds: [bannedEmbed], ephemeral: false })
        }).catch(error => {
            console.error(error)
        })
    },
};