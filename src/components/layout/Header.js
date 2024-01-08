'use client'

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import { Menu, ShoppingCart, X } from "lucide-react";
import { MainTopMenu } from './main-menu';

export default function Header() {
  const [showPwaMenu, setShowPwaMenu] = useState(false);
  const session = useSession();
  const status = session?.status
  const userData = session.data?.user;
  let username = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  if (username?.includes(' ')) {
    username = username.split(' ')[0]
  }
    const handleToggleClick = () => {
    setShowPwaMenu(state => !state);  
    }
    return (
        <header className='flex items-center border-b justify-between pb-3'>
          <div className="flex gap-4 items-center">
            <button onClick={() => setShowPwaMenu(state => !state)} className="flex md:hidden p-1 w-8 h-8">
              <Menu />
            </button>
            <Link href='/' className='text-primary font-semibold uppercase text-2xl'>
              st pizza
            </Link>
          </div>
          <div className="md:flex hidden">
            <MainTopMenu />
          </div>
          {showPwaMenu && (
              <div onClick={handleToggleClick} className="inset-0 fixed bg-black/80">
                <div className="absolute left-2 rounded-lg top-16 p-10 bg-white">
              <div onClick={(e) => {
                  e.stopPropagation();
                  handleToggleClick();
                }}
                className="absolute top-2 right-2 cursor-pointer bg-gray-200 rounded-full">
                      <X />
                    </div>
                    <MainTopMenu isOpen={showPwaMenu} />
                </div>
              </div>
          )}
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          {status === "authenticated" && (
            <>
              <Link className="whitespace-nowrap" href={'/profile'}>
                Hello, {username}
              </Link>
            <button
              onClick={() => signOut()}
              className="bg-primary rounded-full px-8 py-2 border-white text-white">
                LogOut
            </button>
          </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link href='/login'>Login</Link>
              <Link href='register'
              className='bg-primary rounded-full text-white px-8 py-2'
              >
                Register
              </Link>
            </>
          )}
          <Link href={'/cart'} className="flex gap-2">
            <ShoppingCart />
            <span className="p-[3px] px-2 text-sm rounded-full bg-primary text-white">
              {cartProducts.length}
            </span>
          </Link>
        </nav>
      </header>
    )
}