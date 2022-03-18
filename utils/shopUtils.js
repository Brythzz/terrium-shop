import { MessageEmbed, MessageActionRow, MessageSelectMenu } from 'discord.js';

export const constructEmbed = (items, discount) => {
    const fields = [];
    for (const item of items) {
        const { name:itemName, price, quantity, expiration } = item;

        let name = itemName;
        if (quantity) name += ` (x${quantity})`;

        const priceTag = discount
            ? `~~${price}~~ → ${(price * (100 - discount) / 100)}`
            : Intl.NumberFormat().format(price);

        let value = `${priceTag} <:ft:${process.env.coinEmojiId}>`;
        if (expiration) value += `\nExpire <t:${expiration}:R>`;

        fields.push({ name, value });
    }

    let description = 'Vous pouvez gagner des FTs en participant aux évènements organisés par la famille FT';
    if (fields.length === 0) description += '\n\nAucun objet n\'est disponible pour le moment';

    return [new MessageEmbed()
        .setTitle('🏆 Terrium Shop')
        .setColor('#2f3136')
        .setImage('https://i.imgur.com/6NKsVEm.png')
        .setDescription(description)
        .addFields(...fields)];
}

export const constructComponents = (items, discount) => {
    if (!items.length) return null;

    const options = [];

    for (const item of items) {
        const { name, price } = item;

        const value = `Acheter pour ${Intl.NumberFormat().format(price * (100 - discount) / 100)} FTs`;

        options.push({
            label: name,
            description: value,
            value: name
        });
    }

    return [new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('shop')
                .setPlaceholder('Objet à acheter')
                .addOptions(options)
        )];
}
