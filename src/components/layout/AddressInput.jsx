
export const AddressInput = ({addressProps, setAddressProps}) => {
    const {
        phone, streetAddress, city, country, postalCode,
    } = addressProps;
    
    return (
        <>
            <label>Phone Number</label>
            <input
                type="tel"
                placeholder="Phone"
                onChange={ev => setAddressProps('phone', ev.target.value)}
                value={phone}
            />
            <label>Address</label>
            <input
                type="text" placeholder="Street address"
                value={streetAddress} onChange={ev => setAddressProps( 'streetAddress', ev.target.value)} />
            <div className="grid grid-cols-2 gap-2 ">
                <div>
                    <label>postal Code</label>
                    <input
                        type="text" placeholder="Postal code"
                        value={postalCode} onChange={ev => setAddressProps('postalCode', ev.target.value)}
                        />
                </div>
                <div>
                    <label>city</label>
                    <input
                        type="text" placeholder="city"
                        value={city} onChange={ev => setAddressProps('city', ev.target.value)}
                    />
                </div>
            </div>
            <label>Country</label>
            <input
                type="text" placeholder="Country"
                className="m-0"
                value={country} onChange={ev => setAddressProps('country' ,ev.target.value)}
            />
        </>
    );
}