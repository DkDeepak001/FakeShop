const jwt = require("jsonwebtoken");
const { newUser, newItem } = require('./conn');






exports.addToCart = async(data) => {
    try {
        const {token , itemId } =  data;
        const decode = jwt.verify(token, 'kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a');
       
        //checking if token valid  and username avaliable in userDB
        const isUsername = await newUser.findOne({userName : decode.userName});
        if(isUsername === null){
            return {error : "failed" , message : "Invalid token"}
        }else{
            // checking username available in cart
            const userName = isUsername.userName;
            const ts = (Math.floor(Date.now() / 1000));

            const findUserInCart = await newItem.findOne({userName : userName});
            if(findUserInCart){
                const findItemInCart = await newItem.findOne({userName : userName , "cartItem.productId" : itemId });
                if(findItemInCart === null){
                    const updateCart = await newItem.findOneAndUpdate({userName : userName},{$push:{cartItem : [{productId : itemId, timeStamp : ts}]}})
                    return {status : 'ok'}
                }else{
                    const updateItemCount = await newItem.updateOne({userName : userName , "cartItem.productId" : itemId } , {$inc : { "cartItem.$.productCount" : 1  }});
                    return {status : 'ok'}
                }
            }else{  
                const newCartItem = new newItem({
                    userName : userName,
                    token : token,
                    cartItem : [{productId : itemId, timeStamp : ts}]
                })
                
                const result = await newCartItem.save();
                return {status : 'ok'}
            };
        }   
    } catch (error) {
        return {status : "failed" , message  : error}
    }
} 

exports.getCart = async( data ) => {
   try {
    const decode = jwt.verify(data, 'kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a');
    
    const getItems = await newItem.findOne({userName : decode.userName})
    if(getItems){
        if(getItems.cartItem.length == 0){
            const removeEmpty = await newItem.findOneAndRemove({userName : decode.userName});
        }else{
            return {cart : getItems.cartItem , status : "ok", message : getItems.cartItem.length + " items found" };
        }
    }

   } catch (error) {
    console.log(error)
   }
    

}

exports.changeQuantity = async ({type , token ,productId , quantity}) => {
    const decode = jwt.verify(token, 'kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a');
   if(type === 'increament'){
    const updateItemCount = await newItem.findOneAndUpdate({userName : decode.userName , "cartItem.productId" : productId } , {$inc : { "cartItem.$.productCount" : 1  }});
    console.log(updateItemCount);
    // await updateItemCount.save();
    return {status : 'ok'}
   }else if(type === 'decreament'){
    const updateItemCount = await newItem.findOneAndUpdate({userName : decode.userName , "cartItem.productId" : productId } , {$inc : { "cartItem.$.productCount" : -1  }});
    // await updateItemCount.save();
    return {status : 'ok'} 
  }
}

exports.deleteItem = async ({productId , token}) =>{
    const id = ((productId).toString());
    const decode = jwt.verify(token, 'kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a');
    const updateItemCount = await newItem.findOneAndUpdate({userName : decode.userName } , {$pull : { cartItem : {productId : id} }});
    return {status:'ok'};
}