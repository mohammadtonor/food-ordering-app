import { Trash2 } from 'lucide-react';
import { cartProductPrice } from './../AppContext';
import Image from 'next/image';

export const CartProduct = ({product, onRemove, index}) => {
    return (
        <div key={product._id} className="grid grid-cols-3 items-center gap-4 mb-2 border-b py-2">
            <div className="w-24">
                <Image width={240} height={240} src={product.image} alt=""/>
            </div>
            <div>
                <h3 className="text-gray-800 font-bold">
                    {product.name}
                </h3>
                {product.sizes && (
                    <div className="text-sm items-center text-gray-500  p-1 px-2 my-1 rounded-full">
                        Sizes:
                        <span className="bg-yellow-500 rounded-full text-white p-[6px] px-2 text-center">
                            {product.sizes?.name}
                        </span>
                    </div>
                )}
                {product.extras.length > 0 && (
                    <div className="text-sm">
                        Extras:
                        {product.extras.map((ex) => (
                            <div className="my-[2px] text-white text-center bg-orange-500 mx-[1px]  w-24 p-1 rounded-full">
                                {ex.name} ${ex.price}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2">
                <div className="ml-8 font-bold text-lg">
                    ${cartProductPrice(product)}
                </div>
                {!!onRemove && (
                <div className="ml-4">
                        <button
                            type='buutton'
                            onClick={() => onRemove(index)}        
                            className="text-center text-gray-500 items-center p-2">
                        <Trash2 className="w-6 h-6"/>
                    </button>
                </div>    
                )}
         </div>
    </div>
    )
}