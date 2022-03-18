# Terrium Shop

Discord shop bot for the Terrium Clash of Clans team
<p align="center">
  <img width="224" height="224" src="https://user-images.githubusercontent.com/62302815/159078888-b7a3a774-3d1e-4fff-bf04-4d15f496c3c6.png" alt="logo"/>
</p>
<p align="center">
  <em style="display:block;">The team's logo</em>
</p>

## Database
The app uses a MySQL database with the following tables:

### Shop
| Field      | Type         | Key | Comment                   |
|------------|--------------|-----|---------------------------|
| name       | varchar(128) | PRI | Item name                 |
| price      | float        |     | Item price                |
| quantity   | int          |     | Item quantity             |
| expiration | int          |     | Item expiration timestamp |

### Users
| Field   | Type        | Key | Comment         |
|---------|-------------|-----|-----------------|
| id      | varchar(18) | PRI | Discord user ID |
| balance | float       |     | User balance    |

### Coupons
| Field    | Type        | Key | Comment                                          |
|----------|-------------|-----|--------------------------------------------------|
| userId   | varchar(18) | PRI | Discord user ID                                  |
| discount | int         |     | Coupon reduction %                               |
| quantity | int         |     | Amount of coupons                                |
| selected | bool        |     | Whether the coupon is selected for next purchase |

### Tax
| Field  | Type | Key | Comment         |
|--------|------|-----|-----------------|
| id     | int  | PRI | Always 1        |
| amount | int  |     | Tax amount in % |

## `.env` file
```env
# Discord settings
TOKEN
clientId
guildId
adminRoleId
shopHistoryChannelId

# Emojis
coinEmojiId
coupon10EmojiId
coupon25EmojiId
coupon50EmojiId
coupon75EmojiId
coupon100EmojiId
keyEmojiId

# Database settings
database=terrium_shop
host
user
password
```

## Setup
Create and complete the `.env` file then run:
```sh
npm run deploy

# Node
node index.js

# PM2
pm2 start index.js --name terrium-shop
```

## Screenshots
![shop1](https://user-images.githubusercontent.com/62302815/159081522-787d8127-e07c-44fd-8e1d-a92c674e4c7b.png)

![shop2](https://user-images.githubusercontent.com/62302815/159081523-b8e3af29-d10c-466a-b7c1-2b0a9a833b03.png)

![inventory](https://user-images.githubusercontent.com/62302815/159081054-287d8244-2b1c-4949-8c14-5607d61b03cb.png)

![commands](https://user-images.githubusercontent.com/62302815/159081519-a8238a2b-b229-4f41-a101-5b9410761aa7.png)
