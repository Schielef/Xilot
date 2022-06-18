# 🤖 Xilot (Discord Bot)
> Xilot is a Discord Bot built with JavaScript, discord.js that uses SlashCommand with Discordjs V13

## Requirements
1. Discord Bot Token [Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
2. Node.js 16.11.0 or newer

## 🚀 Getting Started

```
git clone https://github.com/schielef/Xilot.git
cd Xilot
npm install
```
After installation finishes follow configuration instructions then run ``node .`` to start the bot.

## ⚙️ Configuration
⚠️ Note: Never commit or share your token or api keys publicly ⚠️
```json
  {
      
      "token": "",
      "prefix": "!", // this is only for the Ping command
      "mongooseConnectionString": "mongodb+srv://",
      "hostedBy": false,
      "everyoneMention": true

   }
```
## 📝 Features & Commands
> Note: The default prefix is: /
### Giveaway
- /ga-create channel time amount prize
 ``/ga-create #giveaway 1d 1 XP``
- /ga-end MessageID
 ``/ga-end 123456789101112``
- /ga-reroll MessageID
 ``/ga-reroll 123456789101112``
### Level
- /level @user
 ``/level @schielef``
- /leaderboard
### Moderation
- /ban @user reason
 ``/ban @schielef too good``
- /ban @user reason
 ``/ban @schielef too good``
