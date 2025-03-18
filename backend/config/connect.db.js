import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";


/*const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

db.connect((err)=>{
    if(err){
        console.log(`Database connection failed : ${err}`);
    } else {
        console.log(`Database connected successfully`);
    }
});*/


const MYSQL_URL = process.env.MYSQL_URL;

// Parse DATABASE_URL
const regex = /mysql:\/\/(.*):(.*)@(.*):(\d+)\/(.*)/;
const match = MYSQL_URL.match(regex);

if (!match) {
    throw new Error("Invalid MYSQL_URL format");
}

const [ , user, password, host, port, database ] = match;

const db = mysql.createConnection({
    host,
    user,
    password,
    database,
    port: Number(port),
});

db.connect((err) => {
    if(err){
        console.log(`Database connection failed : ${err}`);
    } else {
        console.log(`Database connected successfully`);
    }
});




export default db ;

