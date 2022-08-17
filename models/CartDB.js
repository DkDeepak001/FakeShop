const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fakeShop')
    .then(()=>{
	    console.log('connected');
	})
    .catch((e)=>{
	    console.log("Something went wrong", e);
})

const newUserSchema = new mongoose.Schema({
    userName:String,
    cartItem : {itemID : Number, timeStamp : String},
})