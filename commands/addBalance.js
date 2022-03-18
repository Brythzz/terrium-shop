import { increaseBalance } from '../utils/databaseUtils.js';

export default {
    name: 'ajouter-pieces',
    description: 'Ajoute un montant de FTs au compte d\'un utilisateur',

    async execute(interaction) {
        const user   = interaction.options.getUser('utilisateur');
        const amount = interaction.options.getNumber('montant');

        await increaseBalance(user.id, amount);

        interaction.reply({
            content: `> ${Intl.NumberFormat().format(amount)} FT${ amount != 1 ? 's' : ''} <:ft:${process.env.coinEmojiId}> ont été ajoutés au compte de ${user}`,
            allowedMentions: { parse: [] },
            ephemeral: true
        });
    }
};
