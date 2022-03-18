import { removeItem } from '../utils/databaseUtils.js';

export default {
    name: 'retirer-objet',
    description: 'Retire un objet du shop',

    async execute(interaction) {
        const name = interaction.options.getString('nom');
        const success = await removeItem(name);

        if (success)
            interaction.reply({ content: `> L'objet **${name}** a été retiré du shop !`, ephemeral: true });
        else
            interaction.reply({ content: `> L'objet **${name}** n'existe pas !`, ephemeral: true });
    }
};
