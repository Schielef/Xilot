const { Message, Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
module.exports = {
    name: "reload",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const globPromise = promisify(glob);

        const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
        commandFiles.map((value) => {
            const file = require(value);
            const splitted = value.split("/");
            const directory = splitted[splitted.length - 2];

            if (file.name) {
                const properties = { directory, ...file };
                client.commands.set(file.name, properties);
            }
        });

        const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
        eventFiles.map((value) => require(value));

        const slashCommands = await globPromise(
            `${process.cwd()}/SlashCommands/*/*.js`
        );

        const arrayOfSlashCommands = [];
        slashCommands.map((value) => {
            const file = require(value);
            if (!file?.name) return;
            client.slashCommands.set(file.name, file);

            if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
            arrayOfSlashCommands.push(file);
        });

        await client.application.commands.set(arrayOfSlashCommands);

        message.channel.send('Reloaded')
    },
};
