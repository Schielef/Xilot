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
- /editlevelsystem on/off
 ``/editlevelsystem on``
- /set-joinrole GuildID RoleID
 ``/set-joinrole 123456789101112 123456789101112``
- /set-membercount-channel GuildID ChannelID
 ``/set-membercount-channel 123456789101112 123456789101112``
- /set-meme-channel GuildID ChannelID
 ``/set-meme-channel 123456789101112 123456789101112``
- /set-suggestion-channel GuildID SendInto CreateIn
 ``/set-suggestion-channel 123456789101112 123456789101112 123456789101112``
- /set-tempvoice-channel GuildID ChannelID CategoryID
 ``/set-tempvoice-channel 123456789101112 123456789101112 123456789101112``
- /set-ticket-options GuildID SupportRoleID TicketCategoryID
 ``/set-ticket-options 123456789101112 123456789101112 123456789101112``
- /set-welcome-channel GuildID ChannelID
 ``/set-welcome-channel 123456789101112 123456789101112``
 
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
- /kick @user reason
 ``/kick @schielef too good``
- /purge amount
 ``/purge 20``
- /warn @user reason
 ``/warn @schielef spaming``
- /remove-warns @user warnNumber
 ``/remove-warns @schielef 1 (see warnNumber trough /warns @user)``
- /warns @user
 ``/warns @schielef``
- /userinfo @user
 ``/userinfo @schielef``
### Ticket
- /ticketpannel
## Suggestion System
- /suggest type suggestion
 ``/suggest Game Invite Xilot``
## Minigames
- /meme
- /betrayal
- /checkers
- /chess
- /fishington
- /lettertile
- /ocho
- /poker
- /sketchheads
- /spellcast
- /wordssnack
- /yt
## Others
- /help
- /ping

## 🤝 Last Words
Thank you for using this Bot. You are allowed to change everything the way you want and to use the code in your own projects! If there are any problems or question you run into feel free to contact me on Discord: Xilef#2763
