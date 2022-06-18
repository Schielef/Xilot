const client = require("../index");


client.on("ready", () => {

    console.log(`${client.user.tag} is up and ready to go!`)
    setInterval(() => {
        const arrayOfStatus = [
            'Xilot',
            `on ${client.guilds.cache.size} Servers`,
            '/help'
        ]
        client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)] }], status: 'dnd', type: "WATCHING" })
    }, 5000)
});
