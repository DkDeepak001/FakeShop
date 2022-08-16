const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.175.66:27017/fakeShop')
    .then(()=>{
	    console.log('connected');
	})
    .catch((e)=>{
	    console.log("Something went wrong", e);
	})

const newUser = new mongoose.Schema({
        userName:String,
        password:String,
        timsStamp:String
    }) 
exports.login = async (data) =>{
    console.log(data);
}

exports.signUp = async (data) =>{
    console.log(data);
}