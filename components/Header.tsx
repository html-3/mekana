import Link from 'next/link';
import WCLogoName from '../services/WCLogoName';
import { useState } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { Dialog } from '@headlessui/react';

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const closeNavbar = () => {
    setOpenDropdown(false);
  };

  const navigation = [
    {
      label: 'Contato',
      path: '/contact',
      description: '',
    },
    {
      label: 'Produtos',
      path: '/products',
      description: '',
    },
    {
      label: 'Sobre nós',
      path: '/about',
      description: '',
    },
  ];
  return (
    <div className='sticky top-0 z-10 flex w-full justify-between pb-8 pt-6 md:pt-8 lg:relative bg-gradient-to-b from-white via-white via-80% '>
      <Link
        href='/'
        className='flex items-center'>
        <WCLogoName className='fill-black h-8 w-auto z-20' />
      </Link>
      <nav>
        <ul className='sm:flex space-x-3 hidden'>
          {navigation.map((item, index) => {
            return (
              <li
                key={index}
                className='hover:underline underline-offset-2 transition hover:text-navy'>
                <Link href={item.path}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
        <button
          type='button'
          className='inline-flex items-center justify-center rounded-md sm:hidden'
          onClick={() => setOpenDropdown(true)}>
          <span className='sr-only'>Open main menu</span>
          <HiBars3 className='aria-hidden h-9 w-9' />
        </button>
      </nav>
      <Dialog
        as='div'
        open={openDropdown}
        onClose={setOpenDropdown}>
        <Dialog.Panel
          autoFocus={true}
          className='fixed inset-0 z-20 overflow-y-auto bg-focus p-6 xl:hidden'>
          <div className='flex items-center justify-between'>
            <Link
              href='/'
              onClick={closeNavbar}>
              <WCLogoName className='fill-black h-8 w-auto z-20' />
            </Link>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md'
              onClick={closeNavbar}>
              <span className='sr-only'>Fechar menu</span>
              <HiXMark className='aria-hidden h-9 w-9' />
            </button>
          </div>
          <div className='mt-8 flow-root'>
            <div className='space-y- divide-y-2 divide-space/10'>
              <ul className='space-y-2'>
                {navigation.map((item, index) => (
                  <li
                    key={index}
                    className='block rounded-md py-2 px-3 text-base font-semibold leading-7 hover:bg-space/5'
                    onClick={closeNavbar}>
                    <Link href={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
