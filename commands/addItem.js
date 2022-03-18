import { getListedItems, createItem } from '../utils/databaseUtils.js';

export default {
    name: 'ajouter-objet',
    description: 'Ajoute un objet au shop',

    async execute(interaction) {
        const items = await getListedItems();
        if (items.length >= 25)
            return interaction.reply({ content: '> Le shop est plein !', ephemeral: true });

        const name     = interaction.options.getString('nom');
        const price    = interaction.options.getNumber('prix');
        const quantity = interaction.options.getNumber('quantité');
        const duration = interaction.options.getNumber('duree');

        const expirationDate = duration ? Math.floor(Date.now()/1000 + duration * 60 * 60) : null;

        createItem(name, price, quantity, expirationDate)
            .then(() => interaction.reply({ content: `> L'objet **${name}** a été ajouté au shop !`, ephemeral: true }))
            .catch(() => interaction.reply({ content: `> L'objet **${name}** existe déjà !`, ephemeral: true }));
    }
};
