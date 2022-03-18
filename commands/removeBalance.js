import { decreaseBalance } from '../utils/databaseUtils.js';

export default {
    name: 'retirer-pieces',
    description: 'Retire un montant de FTs du compte d\'un utilisateur',

    async execute(interaction) {
        const user   = interaction.options.getUser('utilisateur');
        const amount = interaction.options.getNumber('montant');

        await decreaseBalance(user.id, amount);

        interaction.reply({
            content: `> ${Intl.NumberFormat().format(amount)} FT${ amount != 1 ? 's' : ''} <:ft:${process.env.coinEmojiId}> ont été retirés du compte de ${user}`,
            allowedMentions: { parse: [] },
            ephemeral: true
        });
    }
};
