'use client';

import Image from "next/image";
import { MenuItem } from "../menu/MenuItem";
import SectionHeader from "./section-header";
import { useEffect, useState } from "react";

export const HomeMenu = () => {
    const [bestSallers, setBestSaller] = useState([]);
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSaller(menuItems.slice(-2));
            })
        })
    }, []);

    return ( 
        <section>
            <div className="absolute left-0 right-0 w-full justify-start 
                    ">
                <div className="absolute left-0 -top-[70px] text-left -z-10 justify-start w-full">
                    <Image src={'/sallad1.png'} height={189} width={109} alt="salad" />
                    
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                   <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
                </div>
            </div>
            <div className="text-center mb-4">
                <SectionHeader
                    mainHeader="check out"
                    subHeader="Our best sallers"
                />  
            </div>
            <div className="grid grid-cols-3 gap-4">
                {bestSallers.length > 0 && bestSallers.map(item => (
                    <MenuItem key={item._id} {...item} />
                ))}
            </div>
        </section>

     );
}
 
