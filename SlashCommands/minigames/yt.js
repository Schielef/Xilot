const client = require('../../index')
const fetch = require('node-fetch')
const { DiscordTogether } = require('discord-together');
const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("activity-yt")
        .setDescription("Start a Youtube session"),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const channel = interaction.member.voice.channel

        if (!channel) return interaction.editReply('You only can use this command when connected to a voice channel')

        if (channel.type !== "GUILD_VOICE") {
            return interaction.editReply({ content: "Please provide a valid voice channel" });
        } else if (channel.type === "GUILD_VOICE") {
            const channelid = channel.id
            client.discordTogether.createTogetherCode(channelid, 'youtube').then(async invite => {
                interaction.deleteReply()
                return interaction.channel.send(`To start the activity click the link (not the button)\n${invite.code}`);
            }).catch(() => { })
        }




    },
};