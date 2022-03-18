import { getListedItems, getListedItem, getBalance, decreaseBalance, decreaseItemQuantity, removeItem, getUserSelectedCoupon , removeCoupon, increaseBalance, getTax } from '../utils/databaseUtils.js';
import { constructEmbed, constructComponents } from '../utils/shopUtils.js';

export default {
    name: 'shop',
    description: 'Permet de consulter le shop',

    async execute(interaction) {
        if (interaction.isCommand()) {
            const items = await getListedItems();
            const coupon = await getUserSelectedCoupon(interaction.user.id);
            const discount = coupon?.discount || 0;
            const availableItems = [];

            // Remove expired items
            items.forEach(item => {
                if (item.expiration && item.expiration < Math.floor(Date.now()/1000))
                    removeItem(item.name);
                else availableItems.push(item);
            });

            interaction.reply({
                embeds: constructEmbed(availableItems, discount),
                components: constructComponents(availableItems, discount),
                ephemeral: true
            });
        }
        else {
            const [itemName] = interaction.values;
            const item = await getListedItem(itemName);
            if (!item || (item.expiration && item.expiration < Math.floor(Date.now()/1000)))
                return interaction.update({ content: `> L'objet **${itemName}** n'est plus disponible !`, embeds: [], components: [] });

            const { quantity, price, name } = item;
            const userBalance = await getBalance(interaction.user.id);

            const coupon = await getUserSelectedCoupon(interaction.user.id);
            const discount = coupon?.discount || 0;
            const userPrice = price * (100 - discount) / 100;

            if (userBalance >= userPrice) {
                await decreaseBalance(interaction.user.id, userPrice);
                if (quantity) await decreaseItemQuantity(name, quantity);
                if (discount) await removeCoupon(interaction.user.id, discount, 1);

                const tax = await getTax();
                await increaseBalance(interaction.client.user.id, Math.floor(userPrice*tax/100));

                interaction.update({ content: `> Vous avez acheté l'objet **${name}** pour ${Intl.NumberFormat().format(userPrice)} FT${ userPrice != 1 ? 's' : ''} <:ft:${process.env.coinEmojiId}> !`, embeds: [], components: [] });
                const { client } = interaction;
                client.channels.resolve(process.env.shopHistoryChannelId).send({
                    embeds: [{
                        color: '#2f3136',
                        description: `> ${interaction.user} a acheté l'objet **${name}** pour ${Intl.NumberFormat().format(userPrice)} FT${ userPrice != 1 ? 's' : ''} <:ft:${process.env.coinEmojiId}>`,
                    }]
                })
            }
            else {
                interaction.update({ content: `Vous n'avez pas assez de FTs <:ft:${process.env.coinEmojiId}> pour acheter l'objet **${name}** !`, embeds: [], components: [] });
            }
        }
    }
};
