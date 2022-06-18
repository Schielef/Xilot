const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const moment = require('moment');

module.exports = {
    ...new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Get infos about a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User you want infos about")
                .setRequired(true)
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        const target = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(target.id);
        interaction.deleteReply()
        const response = new MessageEmbed()
            .setColor('AQUA')
            .setAuthor(`${target.username}`, target.displayAvatarURL({ dynamic: true }))
            .setThumbnail(target.displayAvatarURL({ dynamic: true }))
            .addField("ID", `${target.id}`, false)
            .addField("Roles", `${member.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}`)
            .addField("Member since", `${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(member.joinedAt).startOf('day').fromNow()}`)
            .addField("Created at", `${moment(target.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(target.createdAt).startOf('day').fromNow()}`)
            .setFooter('Xilot')
        interaction.channel.send({ embeds: [response], ephemeral: false })

    },
};