import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';
dotenv.config();

const { clientId, guildId, adminRoleId, TOKEN:token } = process.env;

// Import commands
import * as commandList from './commandsList.js';
const commands = Object.values(commandList);

const rest = new REST({ version: '9' }).setToken(token);

// Register commands
await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

// Get registered commands
const registered = await rest.get(Routes.applicationGuildCommands(clientId, guildId));

// Set commands permissions
const permissions = [{
    id: adminRoleId,
    type: 1,
    permission: true
}];

const adminCommands = registered.filter(command => !command.default_permission);
const newPermissions = adminCommands.map(command => ({ id: command.id, permissions }));

await rest.put(Routes.guildApplicationCommandsPermissions(clientId, guildId), { body: newPermissions });
