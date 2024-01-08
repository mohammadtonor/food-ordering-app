'use client'

import { useProfile } from "../../components/UseProfile";
import { UserTabs } from "../../components/layout/tabs";

const OrdersPage = () => {
    const { data: ProfileData, loading } = useProfile();

    if (loading) {
        return 'Loading...';
    }

    return ( 
        <section className="mt-3">
            <UserTabs isAdmin={ProfileData.admin}/>
        </section>
     );
}
 
export default OrdersPage;