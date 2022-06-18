const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const DB = require('../../schemas/suggestDB')
const db = require('../../schemas/SuggestionSetDB')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    ...new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Create a new Suggestion')
        .addStringOption((option) =>
            option
                .setName("type")
                .setDescription("Select an option")
                .setRequired(true)
                .addChoice('Bot', 'Bot')
                .addChoice('Game', 'Game')
                .addChoice('Server', 'Server')
        )
        .addStringOption((option) =>
            option
                .setName('suggestion')
                .setDescription('Describe your suggestion')
                .setRequired(true)
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        const { options, guildId, member, user } = interaction

        const Type = options.getString('type')
        const Suggestion = options.getString('suggestion')

        const Embed = new MessageEmbed()
            .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "Suggestion", value: Suggestion, inline: false },
                { name: "Type:", value: Type, inline: true },
                { name: "Status", value: "Pending", inline: true },
            )
            .setTimestamp()
            .setFooter(`${interaction.user.username}`)


        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("suggest-accept").setLabel('✅ | Accept').setStyle('PRIMARY'),
            new MessageButton().setCustomId("suggest-decline").setLabel('❌ | Decline').setStyle('SECONDARY'),
            new MessageButton().setCustomId("suggest-done").setLabel('Done').setStyle('SECONDARY'),
        )


        try {

            db.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
                if (err) throw err
                if (data) {

                    const suggchannel = client.channels.cache.get(data.SendToID)
                    if (interaction.channelId === data.CreatedID) {
                        const M = await suggchannel.send({ embeds: [Embed], components: [Buttons] })
                        M.react('⬆️')
                        M.react('⬇️')
                        await DB.create({
                            GuildID: guildId, MessageID: M.id, Details: [
                                {
                                    MemberID: member.id,
                                    Type: Type,
                                    Suggestion: Suggestion
                                }
                            ]
                        })


                        const gesendet = new MessageEmbed()
                            .setColor('AQUA')
                            .setTitle('Server Info')
                            .setDescription(`suggestion was send`)
                            .setFooter('Xilot')
                            .setTimestamp()
                        await interaction.editReply({ embeds: [gesendet] }).then((msg) => {

                            setTimeout(() => {
                                msg.delete()
                            }, 5000)

                        })

                    } else {
                        return
                    }





                } else {
                    return
                }
            })





        } catch (err) {
            console.log(err)
        }

    }
}