import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Avatar from './Avatar';

export default function Profile({ session, onCompletion }) {
	const supabase = useSupabaseClient();

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({
		id: '',
		full_name: '',
		username: '',
		avatar_url: '',
	});

	useEffect(() => {
		getProfile();
	}, [session]);

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
			onCompletion(true);
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
		<>
			<h1>Perfil</h1>
			{loading ? (
				'Atualizando...'
			) : (
				<>
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
						className=' max-w-full'
					>
						<input
							required
							key='full_name'
							name='full_name'
							type='full_name'
							placeholder='Seu nome completo'
							value={user.full_name}
							onChange={handleChange}
						/>
						<input
							required
							key='username'
							name='username'
							type='username'
							placeholder='Seu nome de usuario'
							value={user.username}
							onChange={handleChange}
						/>
						<button className='button'>Enviar</button>
					</form>
				</>
			)}
		</>
	);
}
