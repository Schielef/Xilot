const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/activateLevel')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("editlevelsystem")
        .setDescription("Activate or Disable the LevelSystem")
        .addStringOption((option) =>
            option
                .setName("status")
                .setDescription("Active or Disable the LevelSystem")
                .setRequired(true)
                .addChoice('on', 'on')
                .addChoice('off', 'off')

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
            .setDescription("You need ADMINISTRATOR permissions to use this command")
            .setFooter('Xilot')
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.editReply({ embeds: [noPermissions], ephemeral: true })

        const guild = interaction.guild.id;


        if (interaction.options.getString('status') === 'on') {
            db.findOne({ GuildID: guild }, async (err, data) => {
                if (err) throw err
                if (!data) {
                    data = new db({
                        GuildID: guild,
                        OnOff: true,
                    })
                    interaction.deleteReply()
                    const embed1 = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Server Info')
                        .setDescription(`Set!`)
                        .setFooter('Xilot')
                    interaction.channel.send({ embeds: [embed1], ephemeral: true })
                } else {
                    db.findOneAndUpdate({ GuildID: guild },
                        { $set: { OnOff: true } },
                        { new: true }).exec((err, data) => {
                            console.error(err)
                        })
                        interaction.deleteReply()

                    const updated = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Server Info')
                        .setDescription(`updated the DB`)
                        .setFooter('Xilot')
                    interaction.channel.send({ embeds: [updated], ephemeral: true })
                }
                data.save()
            })
        }

        if (interaction.options.getString('status') === 'off') {
            db.findOne({ GuildID: guild }, async (err, data) => {
                if (err) throw err
                if (!data) {
                    data = new db({
                        GuildID: guild,
                        OnOff: false,
                    })
                    interaction.deleteReply()
                    const embed1 = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Server Info')
                        .setDescription(`Set!`)
                        .setFooter('Xilot')
                    interaction.channel.send({ embeds: [embed1], ephemeral: true })
                } else {
                    db.findOneAndUpdate({ GuildID: guild },
                        { $set: { OnOff: false } },
                        { new: true }).exec((err, data) => {
                            console.error(err)
                        })
                        interaction.deleteReply()
                    const updated = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Server Info')
                        .setDescription(`updated the DB`)
                        .setFooter('Xilot')
                    interaction.channel.send({ embeds: [updated], ephemeral: true })
                }
                data.save()
            })
        } else {
            return
        }







    },
};