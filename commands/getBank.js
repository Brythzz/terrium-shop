import { getBalance, getTax } from '../utils/databaseUtils.js';

export default {
    name: 'banque',
    description: 'Permet de consulter la banque du serveur',

    async execute(interaction) {
        const balance = await getBalance(interaction.client.user.id);
        const tax = await getTax();

        interaction.reply({ 
            content: `> La banque du serveur contient **${Intl.NumberFormat().format(balance)} FT${ balance != 1 ? 's' : ''}** <:ft:${process.env.coinEmojiId}>\n> La taxe est de **${tax}%**`,
            allowedMentions: { parse: [] },
            ephemeral: true
        });
    }
};
