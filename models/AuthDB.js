const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


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
    try {
        const {userName  ,password } = await data;
        const ts = (Math.floor(Date.now() / 1000));
       
        const findUser = await newUser.findOne({userName: userName});
        if(findUser){
            const checkPassword = await bcrypt.compare(password, findUser.password)
            if(checkPassword) {
                const secretPhrase = "kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a" + findUser.password ;
                const token = jwt.sign({userName : findUser.userName},secretPhrase)
                if(token){
                    return {sucess :"user Authenticated" ,token : token};
                }else{
                    return {error : "Something went wrong"}
                }
            }else{
                return {error : "Invalid password"};
            }
        }else {
            return {error :"Invalid username"} ;
        }
    }
     catch (error) {
        return {error : error}
    }
}

exports.signUp = async (data) =>{
    try {
        const {userName ,email ,password } = await data;
        const ts = (Math.floor(Date.now() / 1000));
       
        const findUser = await newUser.findOne({userName: userName});
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if(findUser === null){
            const addNewUser = new newUser({
                userName : userName,
                password : hashedPassword,
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