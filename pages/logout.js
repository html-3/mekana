import { useEffect } from 'react';
import { useUserData } from '../context/user';

export default function LogOut() {
	const { logout } = useUserData();

	useEffect(() => {
		logout();
	}, []);

	return <p>Saindo...</p>;
}
