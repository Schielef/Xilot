const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/MemeChannelDB')
const api = require('imageapi.js')
const axios = require("axios")

module.exports = {
    ...new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Send a meme"),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        db.findOne({ GuildID: interaction.guild.id, ChannelID: interaction.channel.id }, async (err, data) => {
            if (err) throw err
            if (data) {


                let res = await axios.default.get(
                    `https://www.reddit.com/r/memes/random/.json`
                );
                if (!res || !res.data || !res.data.length)
                    return interaction.reply({
                        content: `There is an Error`,
                        ephemeral: true
                    })
                res = res.data[0].data.children[0].data;
                interaction.deleteReply()
                const Embed = new MessageEmbed()
                    .setTitle(res.title)
                    .setImage(res.url)
                    .setURL(`https://www.reddit.com${res.permalink}`)
                    .setFooter(`Xilot`);
                return interaction.channel.send({ embeds: [Embed], ephemeral: false })
            } else {
                const wrongchannel = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('Server Info')
                    .setDescription('wrong channel')
                    .setFooter('Xilot')
                interaction.editReply({ embeds: [wrongchannel], ephemeral: true })
            }
        })


    },
};