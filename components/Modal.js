import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function Modal({
	isOpen,
	setIsOpen,
	content,
	title,
	confirmText,
	closeText,
}) {
	return (
		<Dialog
			appear
			open={isOpen}
			as='div'
			className='fixed inset-0 z-10 overflow-y-auto'
			onClose={closeModal}
		>
			<div className='min-h-screen px-4 text-center'>
				<Dialog.Overlay className='fixed inset-0' />

				{/* This element is to trick the browser into centering the modal contents. */}
				<span
					className='inline-block h-screen align-middle'
					aria-hidden='true'
				>
					&#8203;
				</span>

				<div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl'>
					<Dialog.Title
						as='h3'
						className='text-lg font-medium leading-6 text-gray-900'
					>
						{title}
					</Dialog.Title>
					<div className='mt-2'>
						<p className='text-sm text-gray-500 border-t pt-2'>{content}</p>
					</div>

					<div className='mt-4'>
						<button
							type='button'
							className='button'
							onClick={closeModal}
						>
							{closeText}
						</button>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
