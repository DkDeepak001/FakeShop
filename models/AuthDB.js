const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.175.66:27017/fakeShop')
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
    timsStamp:String
}) 

//creating new document for storing data
const newUser = new mongoose.model("User",newUserSchema)

exports.login = async (data) =>{
    console.log(data);
}

exports.signUp = async (data) =>{
    try {
        const {userName ,email ,password } =await data;
        const ts = (Math.floor(Date.now() / 1000));
       
        const addNewUser = new newUser({
            userName : userName,
            password : password,
            timeStamp: ts
        })
        const result = await addNewUser.save()
        return result;
    }
     catch (error) {
        return error
    }

}