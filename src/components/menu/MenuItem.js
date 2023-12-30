
export const MenuItem = () => {
    return (
        <div className="bg-gray-200 group hover:bg-white p-4 rounded-lg text-center
        transition-all hover:shadow-2xl hover:shadow-black/50">
            <div className="text-center">
                <img src="/pizza.png" alt="pizza" className="max-h-24 max-w-24 block mx-auto"/>
            </div>
            <h4 className="font-semibold text-xl my-3 ">
                Popperoni Pizza
            </h4>
            <p className="text-gray-500">
                Loerem ipsom doalr sit meet , connector additionally elist
            </p>
            <button className="bg-primary mt-4 text-white rounded-full px-8 py-2">
                Add to Cart $12
            </button>
        </div>
    );
}