'use client';

import { useContext, useEffect, useState } from 'react';
import { CartContext, cartProductPrice } from './../../../components/AppContext';
import { AddressInput } from './../../../components/layout/AddressInput';
import SectionHeader from './../../../components/layout/section-header'
import { CartProduct } from './../../../components/menu/CartProduct';
import { useParams } from 'next/navigation';

const OrderIdPage = () => {
    const { clearCart } = useContext(CartContext);
    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState(true);
    const { id } = useParams();

    useEffect(() => { 
        if (typeof window.console !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }
        if (id) {
            setLoadingOrder(true);
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(order => {
                    console.log(order);
                    setOrder(order);
                    setLoadingOrder(false);
                })
            })
        }
    }, []);

    let subTotal = 0;
    if (order?.cartProducts) {
        subTotal = order?.cartProducts.reduce((acc, product) => {
            return cartProductPrice(product) + acc;
        }, 0)
    }

    return ( 
        <section className='max-w-2xl mx-auto mt-8'>
            <div className='text-center'>
                <SectionHeader mainHeader={'Your order'} />
                <div className='mt-4 mb-8'>
                    <p>Thank for your order</p>
                    <p>We will call you when your order will be on the way.</p>
                </div>
            </div>
            {loadingOrder && (
                <div>Loading order...</div>
            )}
            {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map(product => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">${subTotal}</span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subTotal + 5}
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInput
                disabled={true}
                addressProps={order}
              />
            </div>
          </div>
        </div>
      )}
        </section>
     );
}
 
export default OrderIdPage;