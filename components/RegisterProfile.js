import { useState } from 'react';
import supabase from '../utils/supabase';
import { HiOutlineMail } from 'react-icons/hi';

export default function RegisterProfile() {
	// Loading state
	const [loading, setLoading] = useState(false);
	// E-mail state
	const [email, setEmail] = useState('');

	// Login handler
	const handleLogin = async (event) => {
		event.preventDefault();

		// Behavior and error handler
		try {
			setLoading(true);
			const { error } = await supabase.auth.signInWithOtp({ email });

			if (error) throw error;

			// If error exists this is skipped!
			alert('Confira seu e-mail!');
		} catch (error) {
			// 429 : too many login requests!
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	// Little to no logic should come here
	return (
		<div className='w-11/12 md:w-1/2'>
			<h1>Login</h1>
			<p>Acesse apenas com seu e-mail!</p>
			{loading ? (
				<p className='py-10'>Enviando link ao seu e-mail...</p>
			) : (
				<form
					onSubmit={handleLogin}
					className='mt-8 space-y-8'
				>
					<label
						htmlFor='email'
						className='sr-only'
					>
						E-mail
					</label>
					<div
						htmlFor='email'
						className='relative block focus-within:text-electric-orange focus-within:transform focus-within:ease-in-out'
					>
						<HiOutlineMail className='w-6 h-6 absolute translate-y-2 translate-x-2' />
						<input
							className='input'
							placeholder='Seu e-mail'
							autoComplete='email'
							required
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<button className='button'>Enviar</button>
				</form>
			)}
		</div>
	);
}
