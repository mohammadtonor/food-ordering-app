'use client'

import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import { UserTabs } from "../../components/layout/tabs";
import Link from "next/link";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const { data: ProfileData, loading } = useProfile();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders);
                setLoadingOrders(false);
            })
        })
    }

    return ( 
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={ProfileData.admin} />
            <div className="mt-8">
                {loadingOrders && 
                    <div>Loading Orders...</div>
                }
                {orders?.length > 0 && orders.map((order) => (
                    <div key={order._id}
                        className="bg-gray-100 mb-2 p-4 flex flex-col md:flex-row items-center gap-6"
                    >
                        <div className="grow flex flex-col md:flex-row items-center gap-6">
                            <div>
                                <div className={
                                    (order.paid ? 'bg-green-500' : 'bg-red-500')
                                    + ' p-2 rounded-md text-white text-center w-20'
                                }>
                                    {order.paid ? "Paid": 'Not paid'}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="flex gap-2 items-center mb-1">
                                    <div className="grow">{order.userEmail}</div>
                                    <div className="text-gray-500 text-xs">{order.createdAt}</div>
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {order.cartProducts.map(p => p.name).join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                            <Link href={'/orders/' + order._id} className="button">
                                Show Order
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </section>
     );
}
 
export default OrdersPage;