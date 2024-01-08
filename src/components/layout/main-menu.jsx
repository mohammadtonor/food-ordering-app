import Link from "next/link";

export const MainTopMenu = ({isOpen}) => {
    return (

        <nav className={`flex gap-8 items-center text-gray-500 font-semibold  ${isOpen ? 'flex-col':'flex-row'}`}>
          <Link href='/'>Home</Link>
          <Link href='/menu'>Menu</Link>
          <Link href='/#about'>About</Link>
          <Link href='/#contact'>Contact</Link>
        </nav>
    );
}