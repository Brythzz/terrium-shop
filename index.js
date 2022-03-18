import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

import { Client, Intents, Collection } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Init commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
    const { default:command } = await import(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Init events
const eventFiles = fs.readdirSync('./events');

for (const file of eventFiles) {
    const { default:event } = await import(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
}

client.login(process.env.TOKEN);
