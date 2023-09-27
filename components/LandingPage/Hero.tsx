import Link from 'next/link';

export default function Hero() {
  return (
    <div className='h-screen flex items-center justify-center flex-col space-y-8 -translate-y-24'>
      <div className='self-start w-1/2 text-right'>
        <h1 className='md:text-8xl font-bebas  text-5xl font-bold md:border-b-8 border-b-4 border-primary '>
          MEKANA
        </h1>
      </div>
      <div className='self-end w-1/2 text-left'>
        <p className='italic font-semibold w-2/3'>O blog de engenharia</p>
      </div>
      <Link
        href='/blog'
        className='hover:text-secondary transition-colors hover:underline'>
        Acessar todas as postagens
      </Link>
    </div>
  );
}
