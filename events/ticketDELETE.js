const { Client, CommandInteraction, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const DB = require('../schemas/TicketDB')
const client = require('../index')

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return


    switch (interaction.customId) {
        case 'closeticket': {

            if(!interaction.member.permissions.has('MANAGE_MESSAGES')) {

                const embed = new MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('Ticket System')
                    .setDescription('Ticket can now be closed!')
                    .setFooter('Xilot')

                    const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('closeticket')
                            .setLabel('🗑️| CLOSE TICKET')
                            .setStyle('DANGER')
                    )
                    
                interaction.channel.send({ embeds: [embed], components: [row1], ephemeral: false })
            } else if(interaction.member.permissions.has('MANAGE_MESSAGES')) {
                interaction.channel.delete();
            }
            
        }
    }


})