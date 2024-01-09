import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from './../../../pages/api/auth/[...nextauth]'
import { MenuItem } from './../../../models/MenuItem';
import { Order } from './../../../models/Order';
const stripe = require('stripe')(process.env.STRIPE_SK);


export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    const { cartProducts, addressProps } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...addressProps,
        cartProducts,
        paid: false
    });

    const stripeLineItems = [];
    for (const cartProduct of cartProducts) {

        const productInfo = await MenuItem.findById(cartProduct._id);

        let productPrice = productInfo.basePrice;
        if (productInfo.sizes) {
            const size = productInfo.sizes
                .find(size => size._id.toString() === cartProduct.sizes._id.toString());
            productPrice += size.price;
        }
        if (productInfo.extras > 0) {
            for (cartProductExtraThing of cartProduct.extras) {
                const productExtras = productInfo.extraIngredientPrices;
                const extraThingInfo = productExtras
                    .find(extra => extra._id.toString() === cartProductExtraThing._id.toString())
                productPrice += extraThingInfo.price;
            }
        }

        const productName = cartProduct.name;

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                name: productName,
                },
                unit_amount: productPrice * 100,
            },
        });
    }

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: {orderId:orderDoc._id.toString()},
        payment_intent_data: {
          metadata:{orderId:orderDoc._id.toString()},
        },
        shipping_options: [
          {
            shipping_rate_data: {
              display_name: 'Delivery fee',
              type: 'fixed_amount',
              fixed_amount: {amount: 500, currency: 'USD'},
            },
          }
        ],
    });
    
    return Response.json(stripeSession.url);

}