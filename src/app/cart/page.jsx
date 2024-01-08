'use client';

import { CartContext, cartProductPrice, } from "../../components/AppContext";
import { useContext, useEffect, useState } from "react";
import { useProfile } from './../../components/UseProfile';
import SectionHeader from "../../components/layout/section-header";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { AddressInput } from './../../components/layout/AddressInput';
import toast from "react-hot-toast";
import { CartProduct } from "../../components/menu/CartProduct";

const CartPage = () => {
    const { cartProducts, removeFromCart } = useContext(CartContext);
    const [addressProps, setAddressProps] = useState({});
    const { data: profileData } = useProfile();
    
    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, postalCode, country, city } = profileData;
            const addressformProfile = {
                phone,
                streetAddress,
                city,
                postalCode,
                country
            }
            setAddressProps(addressformProfile);
        }
    }, [profileData])

    const handleAddressProps = (propName, value) => {
        setAddressProps(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    const proceedToCheckout = async (e) => {
        e.preventDefault();

        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    addressProps,
                    cartProducts
                }),
            }).then(async (res) => {
                if (res.ok) {
                    resolve();
                    window.location = await res.json();
                } else {
                    reject();
                }
            });
        });

        await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting To payment..',
            error: 'Somthing went wrong... Please try again later',
        })
    }
    
    const subTotal = cartProducts.reduce((acc, item) => cartProductPrice(item) + acc, 0);

    if (cartProducts.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeader mainHeader={'Cart'} />
                <p className="mt-4">Your shopping cart is empty 😔</p>
            </section>
        );
    }

    return ( 
        <section className="mt-8">
            <div className="text-center">
                <SectionHeader mainHeader={'Cart'} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mt-6">
                <div>
                    {cartProducts.length > 0 && cartProducts.map((item, index) => (
                        <CartProduct
                            key={index}
                            product={item}
                            index={index}
                            onRemove={removeFromCart}
                        />
                    ))}
                    <div className="text-right py-2 pr-14 flex justify-end items-center">
                        <div className="text-gray-500">
                            SubTotal:<br />
                            Delivery:<br />
                            Total:
                        </div>
                        <div className="font-semibold  pl-2 text-right">
                            ${subTotal}<br />
                            $5<br />
                            ${subTotal + 5}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h1>Chechout</h1>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInput
                            addressProps={addressProps}
                            setAddressProps={handleAddressProps}
                        />
                        <button type="submit">Pay ${subTotal+5}</button>
                    </form>
                </div>
            </div>
        </section>
     );
}
 
export default CartPage;