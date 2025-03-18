import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";


/*const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});*/

MYSQL_URL=`mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`
const db = mysql.createConnection(MYSQL_URL);
db.connect((err)=>{
    if(err){
        console.log(`Database connection failed : ${err}`);
    } else {
        console.log(`Database connected successfully`);
    }
});

export default db ;

