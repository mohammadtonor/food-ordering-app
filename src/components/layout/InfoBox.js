export const InfoBox = ({children}) => {
    return (
        <div className='mx-auto max-w-md'>
            <h2 className='bg-orange-200 p-4 text-center rounded-lg border border-orange-300'>
                {children}
            </h2>
        </div>
    );
}