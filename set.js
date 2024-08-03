const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0tvZDR2Nk0yZ3NiUXR5WjA1eUsyclFtSHhMV3ZOUTFuZGhnS0lneWhVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFo3L2lkTUlEb1puQU9JSGp4eUYzSStDQ3Ivc0tpNEhoMEtuQkc3emNqUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrUHlzYzRHQ1F4TTFvTlZoNXlmeXhxajhvS3ZqZUxCRUxaeXNmazN0UUg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPb2xnSnNkcERiTExiSmwyZW1JblFIM3JoNExxVUJWK1MrbjArQlIxMUJrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhDbCtZSGtONVJ3aU15VEZ6VTZodmJzK2hia01qMUtTZUFnSS9XODdOazQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRTQVFpT1NsRlBPTmRWSFhSbDVnZ0FmbDdBc0JuSFZTdWQzcHZkbTN3bms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0V5RUliY3B0OWhBczhtSGVXK0NtcFEyZHZWWXdjdktmMUphMkVQNWxrRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic3lEVE5NZ3Z6enpIem05NmhqNllDaFFNRFNDMEJicUttVVNDbXRWTmNHTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNWbHR1TGFlN3BEd1c5MVdXWHgxb21ZQ0pUdEtXYjZKUGNWdndCQlFTY3c1dlJVTm1mVDdPc2lDNjQ3Wi92bEpSZlFyVE1iSXdwdUxaR096aGNBZWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTMsImFkdlNlY3JldEtleSI6Im9IOFdnR1ZVaFArMm1vN2xudWUvYmdCUWRseGZWZkhaNEVZN2RzU050d3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjVfS3RhaGlRU0tHZVc5X01QRXg1YVEiLCJwaG9uZUlkIjoiNzJlZTBkMDEtNzYwZS00YmYyLTg5NDItOGQwNWEzNjg4YTdiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNWR3dicXJaRGpvWDY2QlJ1SkZsSERNR21yND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSbXNVWVZBdjhvWTVERXFQR2NzNUNNYVcyVVk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR1hIODRCS1YiLCJtZSI6eyJpZCI6IjQwNzcwODExOTI5OjY5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6ItKTzLbhtIfMtuG0gMy2yoDMtsqfzLbhtIfMtnPMtnPMtiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1d4ck1JQkVKZlB1YlVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRk1VNTBtWWQrVnpVaGxkM2J6NGNYb01pRzhuaENvSHJMOTMxQ09FdWJEOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoicmhhekVqd0d2UzVkd21TeVA1S1ZRMG1ZOGJ3S1d5MWlWNk9sRDY1aFAyVjJxWlpvNGtVU3U1cjlFektkdWI1UGRieWc0QUpVQksyOVlHdmNlVmZNQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IkVHbFZMTXFoWnl1VzY2KzFtMUdkUjNBdW94QVFaaDVuYWUrclVIRWk2dnhKL1NLZFp1cHVCY29udEdIQXNYQlAvTDFOV0h3NE1kR2RteXViRlRDQ2l3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3NzA4MTE5Mjk6NjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUlRGT2RKbUhmbGMxSVpYZDI4K0hGNkRJaHZKNFFxQjZ5L2Q5UWpoTG13LyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjcwNTgyOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBLy8ifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "0770811929", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
