import { addCoupon, getUserCoupons } from '../utils/databaseUtils.js';
import { getCouponNameFromDiscount } from '../utils/inventoryUtils.js';

export default {
    name: 'ajouter-coupon',
    description: 'Ajoute un coupon de réduction à l\'inventaire d\'un utilisateur',

    async execute(interaction) {
        const user     = interaction.options.getUser('utilisateur');
        const discount = interaction.options.getNumber('réduction');
        const quantity = interaction.options.getNumber('quantité') || 1;

        const userCoupons = await getUserCoupons(user.id);
        const hasCouponOfType = userCoupons.some(coupon => coupon.discount === discount);

        if (!hasCouponOfType && userCoupons.length >= 25)
            return interaction.reply({
                content: `> ${user} a déjà 25 coupons de réduction différents dans son inventaire!`,
                ephemeral: true
            });

        const content = (quantity === 1)
            ? `> Un **${getCouponNameFromDiscount(discount)}** a été ajouté à l'inventaire de ${user}!`
            : `> ${quantity} **${getCouponNameFromDiscount(discount)}** ont été ajoutés à l'inventaire de ${user}!`;

        addCoupon(user.id, discount, quantity)
            .then(() => interaction.reply({
                content,
                ephemeral: true
            }));
    }
};
