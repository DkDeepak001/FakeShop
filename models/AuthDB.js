const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { newUser, newItem } = require('./conn');



exports.login = async (data) =>{
    try {
        const {userName  ,password } = await data;
        const ts = (Math.floor(Date.now() / 1000));
       
        const findUser = await newUser.findOne({userName: userName});
        if(findUser){
            const checkPassword = await bcrypt.compare(password, findUser.password)
            if(checkPassword) {
                const secretPhrase = "kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a";
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


exports.validateToken = async (data) => {
    // if(data){
    //     const verifyToken = await jwt.verify(data, 'kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a', function(err, decoded) {
    //         if(err){
    //             console.log(err);
    //         }else if(decoded)
    //         console.log(decoded.userName);
    //     })
    // }else {
    //     return {userName : null}
    // }
    
    if(data){
        try {
            var decoded = jwt.verify(data, 'kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a');
            return {userName : decoded.userName , status : "sucess" , message : "token verifed sucessfully"}
        } catch(err) {
            return {userName: null , message : "invalid token" ,status : "failed"}
          }
    }else{
        return {userName : null , status :"failed" , message: "Token not found"} 
    }
}