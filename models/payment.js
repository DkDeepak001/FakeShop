const stripe = require('stripe')('sk_test_51LYTLnSIJ0SSBr0US3X5jVm6adnfUWLG3O5sEHHOUhCSTkZVABUxfhwLh1Eco5Xh713ziZOkF2mEid5HzHyhtIMS00L3gVJ8TB');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { newUser, newItem ,newOrder } = require('./conn');

exports.check = async ({paymentToken,cartProducts,token}) =>{
try {
    const  decoded = jwt.verify(token, 'kndJI8*6^46A/GS*D&576(*^YA+--&26214-+hj0a9sd+-+8a');
    const findEmail  = await newUser.findOne({userName: decoded.userName});
    const customer = await stripe.customers.create({
        email:findEmail.email,
        name:decoded.userName
      });
      const totalAmount = cartProducts.reduce((a,b) => a +  (b.price * b.quantity)  ,0 );
      const uid =  uuidv4();
      const session = await stripe.checkout.sessions.create({
        line_items:cartProducts.map((items)=> {
            return{
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:items.title
                    },
                    unit_amount:items.price * 100,
                },
                quantity:items.quantity
            }
        }),
        customer:customer.id,
        mode: 'payment',
        currency:'usd',
        client_reference_id:uid,
        payment_method_types: ["card"],
        success_url: 'http://localhost:3000/success/{CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
      })

      return {customer : customer ,session :session};

} catch (error) {
    return{error : error};
}
}

exports.checkPayment = async ({id,token})=>{
    const session = await stripe.checkout.sessions.retrieve(id);
    const getListItems = await stripe.checkout.sessions.listLineItems(session.id);
    
    const ifUserHadOrder = await newOrder.findOne({userName:session.customer_details.name})
   if(ifUserHadOrder){
    console.log(ifUserHadOrder);
        if(session.status === 'complete'){
            const updateCart = await newOrder.findOneAndUpdate(
                {userName : session.customer_details.name},
                {$push:
                    {orderNumber
                         : [{
                            session_id:session.id,
                            amount_total:session.amount_total,
                            customer_id_Stripe:session.customer,
                            payment_status:session.status,
                            Product:(getListItems.data)
                        }]
                    }
                }
            )
                console.log("pushed");
        }else{
            console.log("payment not completed");
        }
   }else{
    const addNewOrder = new newOrder({
        userName:session.customer_details.name,
        email:session.customer_details.email,
        client_reference_id:session.client_reference_id,
        orderNumber:[{
            session_id:session.id,
            amount_total:session.amount_total,
            customer_id_Stripe:session.customer,
            payment_status:session.status,
            Product:(getListItems.data)
        }]
    })
    const result = await addNewOrder.save();   
}




}