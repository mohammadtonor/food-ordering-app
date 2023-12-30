import Image from "next/image";
import { MenuItem } from "../menu/MenuItem";
import SectionHeader from "./section-header";

export const HomeMenu = () => {
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
                <SectionHeader mainHeader="menu" subHeader="checkout"/>  
            </div>
            <div className="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>

     );
}
 
