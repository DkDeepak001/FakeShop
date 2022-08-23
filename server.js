const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthDB = require("./models/AuthDB");
const CartDB = require("./models/CartDB");
const Payment = require("./models/payment");
const Order = require("./models/OrderPageDB");
require("dotenv").config();


//initalize express
const app = express();
app.use(cors());

//initalize bodyParse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.route("/")
    .get(async(req,res) =>{
        res.send("home route");
    })
app.route("/read")
    .get(async(req,res) =>{
        const response = await AuthDB.fetchUser();
        res.send(response)
    })




app.route("/login")
    .get(async(req,res) => {
        console.log("login GET route");
    })
    .post(async(req,res) => {
        console.log("login POST reoute");
       const response = (await AuthDB.login(req.body.data));
        if(response.error){
            res.status(200).json({error : response.error});
        }else{
            console.log(response)
            res.status(200).json(response)
        }
    })
    
    app.route("/signUp")
    .get(async(req,res) => {
        console.log("signUp GET route");
    })
    .post(async(req,res) => {
        console.log("signUp POST route");
        const response = (await AuthDB.signUp(req.body.data))
        if(response.error){
            res.status(200).json({error : response.error});
        }else{
            res.status(200).json({sucess : response})
        }
    })

app.route("/validateToken")
    .post(async(req,res) => {
        const response = await AuthDB.validateToken(req.body.data)
        res.status(200).json(response);
    })
    
    app.route("/addCart")
    .post(async(req,res) => {
        const response = await CartDB.addToCart(req.body.data);
        console.log(response)
        res.status(200).json(response);
    })
    
    
    app.route("/getCart")
    .post(async(req,res) => {
        const response = await CartDB.getCart(req.body.data);
        res.status(200).json(response);
    })
    
    app.route("/updateCartQuantity")
    .post(async(req,res) => {
        const response = await CartDB.changeQuantity(req.body.data);
        res.status(200).json(response);
    })
    app.route("/deleteItem")
    .post(async(req,res) => { 
        const response = await CartDB.deleteItem(req.body.data);
        res.status(200).json(response);
    })
    
    app.route("/makePayment")
    .post(async(req,res)=>{
        const response = await Payment.check(req.body.data);
        res.status(200).json(response);
    })

    app.route("/order/sucess")
        .post(async (req,res) => {
            const response = await Payment.checkPayment(req.body.data);
            res.status(200).json(response);
        })
    
    app.route("/OrderPage")
        .post(async (req,res) => {
            const response = await Order.FetchOrder(req.body.data);
            res.status(200).json(response);
    })

    

app.listen(process.env.PORT || 5000,() => {
    console.log("server started at port 5000");
})