import { setTax } from '../utils/databaseUtils.js';

export default {
    name: 'taxe',
    description: 'Définit la taxe du serveur',

    async execute(interaction) {
        const tax = interaction.options.getNumber('montant');
        await setTax(tax);

        interaction.reply({
            content: `> La taxe du serveur a été définie à **${tax}%**`,
            ephemeral: true
        });
    }
};
