import { getBalance } from '../utils/databaseUtils.js';

export default {
    name: 'solde',
    description: 'Permet de consulter le solde d\'un utilisateur',

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur') || interaction.user;
        const balance = await getBalance(user.id);

        interaction.reply({ 
            content: `> ${user} a ${Intl.NumberFormat().format(balance)} FT${ balance != 1 ? 's' : ''} <:ft:${process.env.coinEmojiId}>`,
            allowedMentions: { parse: [] },
            ephemeral: true
        });
    }
};
