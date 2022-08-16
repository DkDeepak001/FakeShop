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

exports.login = async (data) =>{
    console.log(data);
}

exports.signUp = async (data) =>{
    try {
        const {userName ,email ,password } = await data;
        const ts = (Math.floor(Date.now() / 1000));
       
        const findUser = await newUser.findOne({userName: userName});
        if(findUser === null){
            const addNewUser = new newUser({
                userName : userName,
                password : password,
                email :email,
                timsStamp: ts
            })
            const result = await addNewUser.save()
            
            return true;
        }else {
            return {error :"Username already exist"} ;
        }
    }
     catch (error) {
        return {error : error}
    }

}