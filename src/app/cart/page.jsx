'use client';

import { CartContext, cartProductPrice } from "../../components/AppContext";
import { useContext, useEffect, useState } from "react";
import { useProfile } from './../../components/UseProfile';
import SectionHeader from "../../components/layout/section-header";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { AddressInput } from './../../components/layout/AddressInput';

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
    
    const total = cartProducts.reduce((acc, item) => cartProductPrice(item) + acc, 0);

    return ( 
        <section className="mt-8">
            <div className="text-center">
                <SectionHeader mainHeader={'Cart'} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mt-6">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No any Products in your basket </div>
                    )}
                    {cartProducts.length > 0 && cartProducts.map((item, index) => (
                        <div key={item._id} className="grid grid-cols-3 items-center gap-4 mb-2 border-b py-2">
                            <div className="w-24">
                                <Image width={240} height={240} src={item.image} alt=""/>
                            </div>
                            <div>
                                <h3 className="text-gray-800 font-bold">
                                    {item.name}
                                </h3>
                                {item.sizes && (
                                    <div className="text-sm items-center text-gray-500  p-1 px-2 my-1 rounded-full">Sizes: <span className="bg-yellow-500 rounded-full text-white p-[6px] px-2 text-center">{item.sizes?.name}</span></div>
                                )}
                                {item.extras.length > 0 && (
                                    <div className="text-sm">
                                        Extras:
                                        {item.extras.map((ex) => (
                                            <div className="my-[2px] text-white text-center bg-orange-500 mx-[1px]  w-24 p-1 rounded-full">{ex.name} ${ex.price}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="ml-8 font-bold text-lg">
                                    ${cartProductPrice(item)}
                                </div>
                            <div className="ml-4">
                                <button
                                        onClick={() => removeFromCart(index)}        
                                        className="text-center text-gray-500 items-center p-2">
                                    <Trash2 className="w-6 h-6"/>
                                </button>
                            </div>
                            </div>
                        </div>
                    ))}
                    <div className="text-right pr-16">
                        <span className="text-gray-500">SubTotal:</span> 
                        <span className="text-lg font-semibold pl-2">
                            ${total}
                        </span>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h1>Chechout</h1>
                    <form>
                        <AddressInput
                            addressProps={addressProps}
                            setAddressProps={handleAddressProps}
                        />
                        <button type="submit">Pay ${total}</button>
                    </form>
                </div>
            </div>
        </section>
     );
}
 
export default CartPage;