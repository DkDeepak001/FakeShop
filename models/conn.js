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

const orderDetailsSchema = new mongoose.Schema({
    userName:String,
    email:String,
    orderNumber:[{
        session_id:String,
        amount_total:Number,
        client_reference_id:String,
        customer_id_Stripe:String,
        payment_status:String,
        Product:[]
    }]
})

const newOrder = new mongoose.model("orderPage",orderDetailsSchema);


// Exporting our model objects
module.exports = {
    newUser, newItem,newOrder
}