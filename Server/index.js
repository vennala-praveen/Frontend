const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

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


app.get("/wallpapers",(req,res)=>{
    const wallpapers =[
        {id:1, url:"/wallpapers/wallpaper1.jpg",name:"Wallpaper1"},
        {id:2, url:"/wallpapers/wallpaper2.jpg",name:"Wallpaper2"},
        {id:3, url:"/wallpapers/wallpaper3.jpg",name:"Wallpaper3"},
        {id:4, url:"/wallpapers/wallpaper4.jpg",name:"Wallpaper4"},
    ];
    res.json(wallpapers);
});

app.use("/wallpapers", express.static(path.join(__dirname, "public/wallpapers")));


const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});