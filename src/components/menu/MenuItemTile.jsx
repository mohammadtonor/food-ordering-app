import { AddToCartButton } from './../layout/AddToCartButton';

export const MenuItemTiles = ({ onAddToCart, ...menuItem }) => {
    const {
        name, description, image, basePrice,
        extraIngredientPrices, sizes
    } = menuItem;
    const hasExtras = (sizes?.length > 0 || extraIngredientPrices.length > 0);

    return (
        <div className="bg-gray-200 group hover:bg-white p-4 rounded-lg text-center
          transition-all hover:shadow-2xl hover:shadow-black/50">
            <div className="text-center">
                <img src={image} alt="pizza" className="max-h-24 max-w-24 block mx-auto"/>
            </div>
            <h4 className="font-semibold text-xl my-3 ">
                {name}
            </h4>
            <p className="text-gray-500">
                {description}
            </p>
            <AddToCartButton
                basePrice={basePrice}
                hasSizeOrExtras={hasExtras}
                onClick={onAddToCart}
            />
        </div>
    )
}