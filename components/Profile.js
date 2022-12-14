import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { HiOutlinePencil, HiOutlineAtSymbol } from 'react-icons/hi';
import Avatar from './Avatar';
import Link from 'next/link';

export default function Profile({ session, onCompletion, initialUser, completion }) {
	const supabase = useSupabaseClient();

	// Loading state
	const [loading, setLoading] = useState(false);
	// User state
	const [user, setUser] = useState(initialUser);

	console.log(user);

	const getProfile = async () => {
		try {
			setLoading(true);

			// I hate JS
			if (session) {
				let { data, error, status } = await supabase
					.from('profiles')
					.select()
					.eq('id', session.user.id)
					.single();

				if (error && status !== 406) {
					throw error;
				}

				if (data) {
					setUser((prev) => ({
						...prev,
						id: session.user.id || '',
						username: data.username || '',
						full_name: data.full_name || '',
						avatar_url: data.avatar_url || '',
					}));
				}
			}
		} catch (error) {
			alert('Error loading user data!');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setLoading(true);

			const updates = {
				id: user.id,
				full_name: user.full_name,
				username: user.username,
				avatar_url: user.avatar_url,
				updated_at: new Date().toISOString(),
			};
			const { error } = await supabase.from('profiles').upsert(updates);
			if (Boolean(user.full_name && user.avatar_url && user.username)) onCompletion(true);
			if (error) throw error;
		} catch (error) {
			console.log(error);
			alert(error.message || 'Error updating the data!');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setUser((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className='flex flex-col space-y-4'>
			<h1>Perfil</h1>

			<Avatar
				userId={user.id}
				url={user.avatar_url}
				size={150}
				onUpload={(url) =>
					setUser((prev) => ({
						...prev,
						avatar_url: url,
					}))
				}
			/>
			<form
				onSubmit={handleSubmit}
				className='pt-2 space-y-4'
			>
				<div className='relative block focus-within:text-electric-orange focus-within:transform focus-within:ease-in-out'>
					<HiOutlinePencil className='w-6 h-6 absolute translate-y-2 translate-x-2' />
					<input
						name='full_name'
						required
						className='input'
						placeholder='Seu nome completo'
						disabled={loading}
						value={user.full_name}
						onChange={handleChange}
					/>
				</div>
				<div className='relative block focus-within:text-electric-orange focus-within:transform focus-within:ease-in-out'>
					<HiOutlineAtSymbol className='w-6 h-6 absolute translate-y-2 translate-x-2' />
					<input
						name='username'
						required
						className='input'
						placeholder='Seu nome de usuario'
						disabled={loading}
						value={user.username}
						onChange={handleChange}
					/>
				</div>
				<button className='button w-full' disabled={loading}>
					{!loading ? <p>Enviar</p> : <p>Atualizando...</p>}
				</button>
			</form>
			{completion ? (
				<Link href='/'>
					<a className='button'>Voltar</a>
				</Link>
			) : null}
		</div>
	);
}
