import Link from 'next/link';
import { Button } from './ui/button';
import { HandMetal } from 'lucide-react';
import { cn } from "@/lib/utils"

const Navbar = () => {
  return (
    <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <HandMetal className='cursor-pointer' />
        </Link>
        <Link  href='/sign-in'>
          <Button className='bg-blue-800 text-white cursor-pointer hover:bg-blue-500'>
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;