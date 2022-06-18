const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index')
const Levels = require('discord-xp')
const db = require('../schemas/activateLevel')
Levels.setURL(client.config.mongooseConnectionString)
client.on('messageCreate', async (message, interaction) => {

    if (message.author.bot) return

    db.findOne({ GuildID: message.guild.id }, async (err, data) => {
        if (err) throw err
        if (data) {

            const onoroff = data.OnOff

            if (onoroff === true) {
                let randomAmountOfXp = Math.floor(Math.random() * 10) + 1


                const hasLeveledUp = await Levels.appendXp(
                    message.author.id,
                    message.guild.id,
                    randomAmountOfXp
                );
                if (hasLeveledUp) {
                    const user = await Levels.fetch(message.author.id, message.guild.id);
                    const embed = new MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('Level')
                        .setDescription(`${message.author}, congratulations! You have leveled up to **${user.level}**.`)
                    message.reply({ embeds: [embed], ephemeral: true })
                }
            }

        } else {
            return
        }
    })




})