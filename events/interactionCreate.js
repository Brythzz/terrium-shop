export default {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand()) {
            const { client, commandName } = interaction;

            const command = client.commands.get(commandName);
            await command.execute(interaction);
        }
        else if (interaction.isSelectMenu()) {
            const { client } = interaction;
            const commandName = interaction.customId;

            const command = client.commands.get(commandName);
            await command.execute(interaction);
        }
    }
};
