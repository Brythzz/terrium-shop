import { removeCoupon } from '../utils/databaseUtils.js';
import { getCouponNameFromDiscount } from '../utils/inventoryUtils.js';

export default {
    name: 'retirer-coupon',
    description: 'Retire un coupon de réduction de l\'inventaire d\'un utilisateur',

    async execute(interaction) {
        const user     = interaction.options.getUser('utilisateur');
        const discount = interaction.options.getNumber('réduction');
        const quantity = interaction.options.getNumber('quantité') || 1;

        const content = (quantity === 1)
            ? `> Un **${getCouponNameFromDiscount(discount)}** a été retiré de l'inventaire de ${user}!`
            : `> ${quantity} **${getCouponNameFromDiscount(discount)}** ont été retirés de l'inventaire de ${user}!`;

        removeCoupon(user.id, discount, quantity)
            .then(() => interaction.reply({
                content,
                ephemeral: true
            }))
            .catch(() => interaction.reply({
                content: `> ${user} n'a pas de ${getCouponNameFromDiscount(discount)}`,
                ephemeral: true
            }));
    }
};
