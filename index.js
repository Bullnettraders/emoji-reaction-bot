const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const greetings = [
  "guten morgen",
  "morgen",
  "moin",
  "servus",
  "schönen start"
];

const emoji = "🌞";

client.once('ready', () => {
  console.log(`✅ Bot ist online als ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (greetings.some(word => content.includes(word))) {
    try {
      await message.react(emoji);
    } catch (error) {
      console.error('Fehler beim Reagieren:', error);
    }
  }
});

client.login(process.env.TOKEN);
