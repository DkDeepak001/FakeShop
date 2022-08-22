const jwt = require("jsonwebtoken");
const { newUser, newItem,newOrder } = require('./conn');


exports.FetchOrder = async (data) => {
   if(data){
    const  decoded = jwt.verify(data, 'kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a');
    const isOrder = await newOrder.findOne({userName: decoded.userName});
    if(isOrder){
     return{status:"ok",order : isOrder}
    }else{
     return{status:"error",message:"error no data found"}
    }
   }
}