  
module.exports = {

    database: {
        connectionLimit: 10,
        host: process.env.HOST_DB || 'localhost',
        user: process.env.USER_DB || 'root',
        password: process.env.PASSWORD_DB || 'root',
        database: process.env.NAME_DB || 'promotional'
    }
};