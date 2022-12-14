import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';

export default function TOCModal({ isOpen, setIsOpen }) {
	const [agreeTOC, setAgreeTOC] = useState(false);

	// Reset agreeTOC state
	useEffect(() => setAgreeTOC(false), [isOpen]);

	return (
		<Dialog
			appear
			open={isOpen}
			as='div'
			className='fixed inset-0 z-10 overflow-y-auto '
			onClose={() => setIsOpen(false, false)}
		>
			<div className='min-h-screen px-4 text-center'>
				<Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />

				{/* This element is to trick the browser into centering the modal contents. */}
				<span
					className='inline-block h-screen align-middle'
					aria-hidden='true'
				>
					&#8203;
				</span>

				<div className='inline-block bg-stone-black w-full max-w-md p-6 space-y-4 text-center align-middle transform'>
					<Dialog.Title as='h1'>Primeiso Acesso</Dialog.Title>
					<div className='space-y-4'>
						<p>
							Leia e confirme nossos{' '}
							<a
								href=''
								className='link'
							>
								Termos de serviço
							</a>{' '}
							para confirmar seu acesso!
						</p>
						<p>
							<input
								type='checkbox'
								className='cursor-pointer h-4 w-4 mr-2 accent-base-gray translate-y-0.5 checked:accent-electric-orange checked:border-electric-orange hover:accent-moody-gray transition'
								onClick={() => setAgreeTOC(!agreeTOC)}
							/>
							<label>Concordo com os Termos de serviço</label>
						</p>
					</div>

					<button
						type='button'
						className='button'
						disabled={!agreeTOC}
						onClick={() => setIsOpen(false, agreeTOC)}
					>
						Bora!
					</button>
				</div>
			</div>
		</Dialog>
	);
}
