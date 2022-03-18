const { host, user, password, database } = process.env;

import mysql from 'mysql2';
const connection = mysql.createConnection({ host, user, password, database });

connection.connect();

const query = async (sql, args) => {
    return new Promise((resolve, reject) => {
        connection.execute(sql, args, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

const initDatabase = async () => {
    await query('CREATE DATABASE IF NOT EXISTS terrium_shop');
    await query('CREATE TABLE IF NOT EXISTS tax (id INT PRIMARY KEY, amount INT(3))');
    await query('CREATE TABLE IF NOT EXISTS users (id VARCHAR(18) PRIMARY KEY, balance FLOAT)');
    await query('CREATE TABLE IF NOT EXISTS shop (name VARCHAR(128) PRIMARY KEY, price FLOAT, quantity INT, expiration INT(11))');
    await query('CREATE TABLE IF NOT EXISTS coupons (userId VARCHAR(18), discount INT, quantity INT, selected BOOL DEFAULT 0, PRIMARY KEY (userId, discount))');
}

await initDatabase();

export const getBalance = async (userId) => {
    const [ user ] = await query('SELECT balance FROM users WHERE id = ?', [userId]);
    return user?.balance || 0;
}

export const setTax = async (amount) => {
    await query('INSERT INTO tax (id, amount) VALUES (1, ?) ON DUPLICATE KEY UPDATE amount = ?', [amount, amount]);
}

export const getTax = async () => {
    const [ tax ] = await query('SELECT amount FROM tax WHERE id = 1');
    return tax?.amount || 0;
}

export const increaseBalance = async (userId, amount) => {
    await query(`
        INSERT INTO users (id, balance) VALUES (?, ?)
        ON DUPLICATE KEY UPDATE balance = balance + ?`,
    [userId, amount, amount]);
}

export const decreaseBalance = async (userId, amount) => {
    await query(`
        INSERT INTO users (id, balance) VALUES (?, ?)
        ON DUPLICATE KEY UPDATE balance = GREATEST(0, balance - ?)`,
    [userId, amount, amount]);
}

export const getListedItems = async () => {
    return await query('SELECT * FROM shop');
}

export const getListedItem = async (name) => {
    const [ result ] = await query('SELECT * FROM shop WHERE name = ?', [name]);
    return result;
}

export const getUserCoupons = async (userId) => {
    return await query('SELECT * FROM coupons WHERE userId = ? ORDER BY discount DESC', [userId]);
}

export const getUserSelectedCoupon = async (userId) => {
    const [ coupon ] = await query('SELECT * FROM coupons WHERE userId = ? AND selected = 1', [userId]);
    return coupon;
}

export const addCoupon = async (userId, discount, quantity) => {
    await query(`
        INSERT INTO coupons (userId, discount, quantity) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
    [userId, discount, quantity, quantity]);
}

export const setActiveCoupon = async (userId, discount) => {
    await query(`UPDATE coupons SET selected = 0 WHERE userId = ?`, [userId]);
    await query(`UPDATE coupons SET selected = 1 WHERE userId = ? AND discount = ?`, [userId, discount]);
}

export const removeCoupon = async (userId, discount, quantity) => {
    const [ coupons ] = await query('SELECT * FROM coupons WHERE userId = ? AND discount = ?', [userId, discount]);

    if (!coupons) throw new Error;

    if (coupons.quantity <= quantity)
        await query('DELETE FROM coupons WHERE userId = ? AND discount = ?', [userId, discount]);
    else
        await query('UPDATE coupons SET quantity = quantity - ? WHERE userId = ? AND discount = ?', [quantity, userId, discount]);
}

export const createItem = async (name, price, quantity=null, expiration=null) => {
    await query('INSERT INTO shop (name, price, quantity, expiration) VALUES (?, ?, ?, ?)', [name, price, quantity, expiration]);
}

export const removeItem = async (name) => {
    const result = await query('DELETE FROM shop WHERE name = ?', [name]);
    return result.affectedRows;
}

export const decreaseItemQuantity = async (name, quantity) => {
    if (quantity <= 1)
        await query('DELETE FROM shop WHERE name = ?', [name]);
    else
        await query('UPDATE shop SET quantity = quantity - 1 WHERE name = ?', [name]);
}

