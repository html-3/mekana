import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { HiBars3, HiXMark, HiOutlineChevronDoubleDown } from 'react-icons/hi2';
import { useUserData } from '../context/user';

export function NavBar() {
	const { session } = useUserData();

	const navigation = [
		{ href: '/', name: 'Inicio' },
		{ href: '/about', name: 'Sobre' },
		{ href: '/auth', name: 'Acessar' },
	];

	const navigationLoggedIn = [
		{ href: '/profile', name: 'Perfil' },
		{ href: '/logout', name: 'Sair' },
	];

	if (!!session) {
		navigation.pop();
		navigation.pop();
	}

	return (
		<nav className='flex pl-5 items-center h-16 justify-center space-x-5 sm:justify-start'>
			{navigation.map((item) => (
				<Link
					href={item.href}
					key={item.name}
				>
					<a className='button--nav'>{item.name}</a>
				</Link>
			))}
			{session
				? navigationLoggedIn.map((item) => (
						<Link
							href={item.href}
							key={item.name}
						>
							<a className='button--nav'>{item.name}</a>
						</Link>
				  ))
				: null}
		</nav>
	);
}
