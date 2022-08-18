const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fakeShop')
    .then(()=>{
	    console.log('connected');
	})
    .catch((e)=>{
	    console.log("Something went wrong", e);
	})

    //creating new schema for created collection
const newUserSchema = new mongoose.Schema({
    userName:String,
    password:String,
    email:String,
    timsStamp:Number
}) 

//creating new document for storing data
const newUser = new mongoose.model("User",newUserSchema)



const newCartItem = new mongoose.Schema({
    userName:String,
    token:String,
    cartItem : [{productId : String, productCount : {type:Number , default : 1} , timeStamp : String}],
})

const newItem = new mongoose.model("cart",newCartItem);

// Exporting our model objects
module.exports = {
    newUser, newItem
}