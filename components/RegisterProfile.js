import { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import supabase from '../utils/supabase';

import TOCModal from './TOCModal';
import emailValidator from '../functions/emailValidator';
import { useUserData } from '../context/user';

export default function RegisterProfile() {
	// Login function
	const { login } = useUserData();
	// Loading state
	const [loading, setLoading] = useState(false);
	// E-mail state
	const [email, setEmail] = useState('');
	// Access state
	const [access, setAccess] = useState(false);
	// Modal state
	const [openModal, setOpenModal] = useState(false);

	// Input handler
	const handleInput = async (event) => {
		const email = event.target.value;
		setEmail(email);
		const validEmail = emailValidator(email);
		setAccess(validEmail);
	};

	// Login handler
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			// Search user in DB
			setLoading(true);
			const { error: queryError } = await supabase
				.from('profiles')
				.select('email')
				.eq('email', email)
				.single();

			// If user doesn't exist, TOC modal will appear
			// Elif handle error
			// Else login
			if (queryError && queryError?.code !== 'PGRST116') throw queryError;
			else if (queryError?.code === 'PGRST116') setOpenModal(true);
			else {
				const { error: loginError } = await login({ email });
				if (loginError) throw loginError;
				else alert('Confira seu e-mail!');
			}
		} catch (error) {
			// 429 : too many login requests! Rate limit exceeded
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	// Signup handler
	const handleSignup = async (openModal, agreeTOC) => {
		// Behavior and error handler
		try {
			setLoading(true);
			setOpenModal(openModal);
			if (agreeTOC) {
				const { error: loginError } = login({ email });
				if (loginError) throw loginError;
				else alert('Confira seu e-mail!');
			}
		} catch (error) {
			// 429 : too many login requests!
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	// Little to no logic should come here
	return (
		<>
			<div className='flex flex-col space-y-4'>
				<h1>Login</h1>
				<p>Acesse apenas com seu e-mail!</p>

				<form
					onSubmit={handleLogin}
					className='space-y-4'
				>
					<div className='relative block focus-within:text-electric-orange focus-within:transform focus-within:ease-in-out'>
						<HiOutlineMail className='w-6 h-6 absolute translate-y-2 translate-x-2' />
						<input
							className='input'
							placeholder='Seu e-mail'
							autoComplete='email'
							required
							type='email'
							value={email}
							onChange={handleInput}
						/>
					</div>
					<button
						className='button'
						disabled={!access || loading}
					>
						{loading ? <p>Carregando...</p> : <p>Acessar</p>}
					</button>
				</form>
			</div>
			<TOCModal
				isOpen={openModal}
				setIsOpen={handleSignup}
			/>
		</>
	);
}
