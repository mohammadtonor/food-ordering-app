'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({});

export const cartProductPrice = (cartProduct) => {
    let price = cartProduct.basePrice;
    if (cartProduct.sizes) {
        price += cartProduct.sizes.price;
    }
    if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += extra.price;
        }
    }
    return price;
}

export const AppProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    const localStorage = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (localStorage && localStorage.getItem('cart')) {
            setCartProducts(JSON.parse(localStorage.getItem('cart')));
        }
    }, [])

    const saveCartProductsToLocalStorege = (cartProduct) => {
        if (localStorage) {
            localStorage.setItem('cart', JSON.stringify(cartProduct));
        }
    }

    const clearCart = () => {
        setCartProducts([]);
        saveCartProductsToLocalStorege([]);
    }

    const removeFromCart = (indexToRemove) => {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts
                .filter((v, index) => index !== indexToRemove);
            saveCartProductsToLocalStorege(newCartProducts);
            return newCartProducts;
        });
        toast.success('item removed successfully');
    }

    const addToCart = (product, sizes=null, extras=[]) => {
        setCartProducts(prevPruducts => {
            const cartProduct = { ...product, sizes, extras };
            const newProduct = [ ...prevPruducts, cartProduct ];
            saveCartProductsToLocalStorege(newProduct);
            return newProduct;
        })
    }



    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts,
                addToCart, clearCart, removeFromCart
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
} 
 