const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "testdb",
});

db.connect((err)=>{
    if(err){
        console.log("Error connection to MySQL:", err);
    }else{
        console.log("Connected to MySQL database");
    }
});


app.post("/login",(req, res)=>{
    const {username, password} = req.body;

    const query = "SELECT * FROM users WHERE username = ? AND password =?";
    db.query(query, [username, password], (err, result)=>{
        if(err){
            return res.status(500).json({message: "Database error"});
        }
        if(result.length > 0){
            res.json({message: "Login successful"});
        }else{
            res.status(401).json({message: "Invalid credentials"});
        }
    });
});


const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});