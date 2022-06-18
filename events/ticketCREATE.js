const { Client, CommandInteraction, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const DB = require('../schemas/TicketDB')
const client = require('../index')

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return


    DB.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
        if (err) throw err;

        if (data) {
            switch (interaction.customId) {
                case 'openticket': {

                    interaction.reply({ content: 'Ticket created', ephemeral: true })
                    interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ['VIEW_CHANNEL'],
                            },
                            {
                                id: interaction.guild.roles.cache.get(data.SupportID),
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                            },
                        ],
                        type: 'text',
                        parent: data.ParentID,
                    }).then(async channel => {
                        const row1 = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('closeticket')
                                    .setLabel('🗑️| CLOSE TICKET')
                                    .setStyle('DANGER')
                            )
                        channel.send({ content: `Hi <@${interaction.user.id}>, thanks for creating a ticket! We will help you as soon as possible! <@&${data.SupportID}>`, components: [row1] });
                    })


                }
            }
        }


    })
})