export const addBalance = {
    name: 'ajouter-pieces',
    description: 'Ajoute un montant de FTs au compte d\'un utilisateur',
    default_permission: false,
    options: [{
        name: 'utilisateur',
        type: 6,
        description: 'Nom de l\'utilisateur',
        required: true
    },
    {
        name: 'montant',
        type: 10,
        min_value: 0,
        description: 'Montant à ajouter',
        required: true
    }]
};

export const removeBalance = {
    name: 'retirer-pieces',
    description: 'Retire un montant de FTs du compte d\'un utilisateur',
    default_permission: false,
    options: [{
        name: 'utilisateur',
        type: 6,
        description: 'Nom de l\'utilisateur',
        required: true
    },
    {
        name: 'montant',
        type: 10,
        min_value: 0,
        description: 'Montant à retirer',
        required: true
    }]
};

export const addItem = {
    name: 'ajouter-objet',
    description: 'Ajoute un objet au shop',
    default_permission: false,
    options: [{
        name: 'nom',
        type: 3,
        description: 'Nom de l\'objet',
        required: true
    },
    {
        name: 'prix',
        type: 10,
        min_value: 0,
        description: 'Prix de l\'objet',
        required: true
    },
    {
        name: 'quantité',
        type: 10,
        min_value: 1,
        description: 'Nombre d\'objets disponibles'
    },
    {
        name: 'duree',
        type: 10,
        min_value: 0,
        description: 'Durée de l\'offre en heures'
    }]
};

export const removeItem = {
    name: 'retirer-objet',
    description: 'Retire un objet du shop',
    default_permission: false,
    options: [{
        name: 'nom',
        type: 3,
        description: 'Nom de l\'objet',
        required: true
    }]
};

export const setTax = {
    name: 'taxe',
    description: 'Définit la taxe du serveur',
    default_permission: false,
    options: [{
        name: 'montant',
        type: 10,
        description: 'Montant de la taxe (en %)',
        min_value: 0,
        max_value: 100,
        required: true
    }]
};

export const getBank = {
    name: 'banque',
    description: 'Permet de consulter la banque du serveur'
}

export const getBalance = {
    name: 'solde',
    description: 'Permet de consulter le solde d\'un utilisateur',
    options: [{
        name: 'utilisateur',
        type: 6,
        description: 'Nom de l\'utilisateur'
    }]
};

export const shop = {
    name: 'shop',
    description: 'Permet de consulter le shop'
};

export const inventory = {
    name: 'inventaire',
    description: 'Permet de consulter les coupons de réduction d\'un utilisateur',
    options: [{
        name: 'utilisateur',
        type: 6,
        description: 'Nom de l\'utilisateur'
    }]
}

export const addCoupon = {
    name: 'ajouter-coupon',
    description: 'Ajoute un coupon de réduction à l\'inventaire d\'un utilisateur',
    default_permission: false,
    options: [{
        name: 'utilisateur',
        type: 6,
        description: 'Nom de l\'utilisateur',
        required: true
    },
    {
        name: 'réduction',
        type: 10,
        min_value: 1,
        max_value: 100,
        description: 'Montant de la réduction',
        required: true
    },
    {
        name: 'quantité',
        type: 10,
        min_value: 1,
        description: 'Nombre de coupons'
    }]
};

export const removeCoupon = {
    name: 'retirer-coupon',
    description: 'Retire un coupon de réduction de l\'inventaire d\'un utilisateur',
    default_permission: false,
    options: [{
        name: 'utilisateur',
        type: 6,
        description: 'Nom de l\'utilisateur',
        required: true
    },
    {
        name: 'réduction',
        type: 10,
        min_value: 1,
        max_value: 100,
        description: 'Montant du coupon',
        required: true
    },
    {
        name: 'quantité',
        type: 10,
        min_value: 1,
        description: 'Nombre de coupons'
    }]
};
