import { getUserCoupons, setActiveCoupon } from '../utils/databaseUtils.js';
import { constructEmbed , constructComponents} from '../utils/inventoryUtils.js';

export default {
    name: 'inventaire',
    description: 'Permet de consulter les coupons de réduction d\'un utilisateur',

    async execute(interaction) {
        if (interaction.isCommand()) {
            const user = interaction.options.getUser('utilisateur') || interaction.user;
            const coupons = await getUserCoupons(user.id);
            const components = (interaction.user.id === user.id)
                ? constructComponents(coupons)
                : [];

            interaction.reply({
                embeds: constructEmbed(coupons, user),
                components,
                ephemeral: true
            });
        }
        else {
            const [discount] = interaction.values;
            await setActiveCoupon(interaction.user.id, +discount);
            interaction.deferUpdate();
        }
    }
};
