const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthDB = require("./models/AuthDB");

//initalize express
const app = express();
app.use(cors());

//initalize bodyParse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.route("/")
    .get(async(req,res) =>{
        console.log("home route");
    })


app.route("/login")
    .get(async(req,res) => {
        console.log("login GET route");
    })
    .post(async(req,res) => {
        console.log("login POST reoute");
        res.status(200).json(await AuthDB.login(req.body.data))
    })
    
    app.route("/signUp")
    .get(async(req,res) => {
        console.log("signUp GET route");
    })
    .post(async(req,res) => {
        console.log("signUp POST route");
        res.status(200).json(await AuthDB.signUp(req.body.data))
    })


app.listen("5000",() => {
    console.log("server started at port 5000");
})