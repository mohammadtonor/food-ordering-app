export const AddToCartButton = ({
    hasSizeOrExtras, basePrice, onClick
}) => {
    return (
        <button
            onClick={onClick}
            className="primary"
            type="submit">
                { hasSizeOrExtras ? (
                    <span>From ${basePrice}</span>
                ): (        
                    <span>Add To Cart ${basePrice}</span>
                )}
        </button>
    );
}