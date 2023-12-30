import Link from "next/link"

export const Header = () => {
    return (
        <header className='flex items-center border-b justify-between pb-3'>
        <Link href='' className='text-primary font-semibold uppercase text-2xl'>
          st pizza
        </Link>
        <nav className='flex gap-8 items-center text-gray-500 font-semibold'>
          <Link href=''>Home</Link>
          <Link href=''>Menu</Link>
          <Link href=''>About</Link>
          <Link href=''>About</Link>
          <Link href=''>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <Link href='/login'>Login</Link>
          <Link href='register' className='bg-primary rounded-full text-white px-8 py-2'>Register</Link>
        </nav>
      </header>
    )
}