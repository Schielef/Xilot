const client = require("../index");


client.on("messageCreate", (message) => {


    if (message.content.includes('http://') || message.content.includes('3 month nitro') || message.content.includes('free nitro') || message.content.includes('nitro for free')) {
        message.author.send('Detected suspicious link/message')

        message.delete()

        console.log('deleted http message');
    }
});