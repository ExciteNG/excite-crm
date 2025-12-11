'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import exciteLogo from "../../../public/assets/svgFiles/exciteLogo.svg";
import sidePortals from '@/src/lib/sideLinks';
import { PiSignOutBold } from "react-icons/pi";


const SideNav = () => {
  const pathName = usePathname();
  return (
    <article className='text-slate-300 w-full h-full'>
      <div className='w-full flex items-center justify-center py-5'>
        <Image src={exciteLogo} alt='logo' />
      </div>
      <div className='w-full p-5 flex flex-col gap-5'>
        {sidePortals.map((portal, index) => {
          return (
            <div key={index}>
              <Link href={portal.link}>
                <div
                  title={portal.tabName}
                  className={`w-full flex items-center gap-2 p-1 px-3 border border-slate-950/60 rounded-lg ${pathName === portal.link && 'bg-stone-800/60 border-stone-900/50'} hover:bg-stone-800/60 hover:border-stone-900/50 shadow`}
                >
                  <portal.icon />
                  <span>{portal.tabName}</span>
                </div>
              </Link>
            </div>
          );
        })}
        <Link href={'/'}>
          <div className='w-full flex items-center gap-2 p-1 px-3 border border-slate-950/60 rounded-lg hover:bg-stone-800/60 hover:border-stone-900/50 shadow'>
            <PiSignOutBold />
            <span>Sign-Out</span>
          </div>
        </Link>
      </div>
    </article>
  );
}

export default SideNav