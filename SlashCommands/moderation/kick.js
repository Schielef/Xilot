const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User to kick")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("Reason for the kick")
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
            .setDescription("You need KICK_MEMBERS permissions to use this command")
            .setFooter('Xilot')
        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.editReply({ embeds: [noPermissions], ephemeral: true })

        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason')

        if (!member.kickable || member.user.id === client.user.id) {
            interaction.deleteReply()
            const noAble = new MessageEmbed()
                .setColor('RED')
                .setTitle('Server Info')
                .setDescription('I am unable to kick this user')
                .setFooter('Xilot')
            return interaction.channel.send({ embeds: [noAble], ephemeral: true })
        }

        await member.kick({
            reason: reason,
        }).then(() => {
            interaction.deleteReply()
            const bannedEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle('Server Info')
                .setDescription(`kicked ${user}\nreason: ${reason}`)
                .setFooter('Xilot')
            interaction.channel.send({ embeds: [bannedEmbed], ephemeral: false })
        }).catch(error => {
            console.error(error)
        })
    },
};