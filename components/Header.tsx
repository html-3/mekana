import Link from 'next/link';
import { useState } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';

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
    <div className='sticky top-0 z-10 flex w-full justify-between pb-8 pt-6 md:pt-8 lg:relative bg-gradient-to-b from-white via-white via-80% '></div>
  );
}
