const mysql = require('mysql2')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
})

mysqlConnection.connect((err) => {
    if(err){
        console.log("Error in Db connection"+err);
    }else{
        console.log("DB connected successfully");
    }
})
module.exports = mysqlConnection