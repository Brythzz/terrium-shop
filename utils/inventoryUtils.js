import { MessageEmbed, MessageActionRow, MessageSelectMenu } from 'discord.js';
const {
    coupon10EmojiId,
    coupon25EmojiId,
    coupon50EmojiId,
    coupon75EmojiId,
    coupon100EmojiId,
    keyEmojiId
} = process.env;

export const constructEmbed = (coupons, user) => {

    const fields = [];
    for (const coupon of coupons) {
        const { discount, quantity } = coupon;

        let name = getCouponNameFromDiscount(discount);
        const value = `x${quantity}`;

        fields.push({ name, value });
    }

    const description = fields.length ? '' : `> ${user} n\'a aucun coupon`;

    return [new MessageEmbed()
        .setTitle(`Inventaire de ${user.username}`)
        .setColor('#2f3136')
        .setDescription(description)
        .addFields(...fields)];
}

export const constructComponents = (coupons) => {
    if (!coupons.length) return null;

    const options = [{
        label: '❌ Aucun coupon',
        description: 'Ne pas utiliser de coupon pour votre prochain achat',
        value: '0'
    }];

    let isCouponSelected;
    for (const coupon of coupons) {
        const label = (coupon.discount === 100)
            ? '🔑Clé en or (100)%'
            : `🎫 Coupon de réduction (${coupon.discount}%)`;

        const selected = !!coupon.selected;
        if (selected) isCouponSelected = true;

        options.push({
            label,
            description: 'Utiliser le coupon pour le prochain achat',
            value: coupon.discount.toString(),
            default: selected
        });
    }

    if (!isCouponSelected) options[0].default = true;

    return [new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('inventaire')
                .setPlaceholder('Coupon à utiliser')
                .addOptions(options)
        )];
}

export const getCouponNameFromDiscount = (discount) => {
    if (discount <= 10) return `<:ft:${coupon10EmojiId}> Coupon de réduction (${discount}%)`;
    if (discount <= 25) return `<:ft:${coupon25EmojiId}> Coupon de réduction (${discount}%)`;
    if (discount <= 50) return `<:ft:${coupon50EmojiId}> Coupon de réduction (${discount}%)`;
    if (discount <= 75) return `<:ft:${coupon75EmojiId}> Coupon de réduction (${discount}%)`;
    if (discount < 100) return `<:ft:${coupon100EmojiId}> Coupon de réduction (${discount}%)`;
    return `<:ft:${keyEmojiId}> Clé en or (100%)`;
}
