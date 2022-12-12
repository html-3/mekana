import Link from 'next/link';

export default function LandingPage() {
	return (
		<>
			<div className='w-screen h-screen flex items-center justify-center flex-col space-y-8'>
				<div className='self-start w-1/2 text-right'>
					<h1 className='md:text-6xl text-4xl font-bold md:border-b-6 border-b-4 border-electric-orange '>
						MEKANA
					</h1>
				</div>
				<div className='self-end w-1/2 text-left'>
					<p className='italic font-semibold w-2/3'>O blog de engenharia</p>
				</div>
				<Link href='/auth'>
					<a className='button'>Acessar</a>
				</Link>
			</div>
			<div className='h-screen'></div>
		</>
	);
}
