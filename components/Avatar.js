import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';

export default function Avatar({ userId, url, size, onUpload }) {
	const supabase = useSupabaseClient();
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		if (url) fetchAvatar(url);
	}, [url]);

	const fetchAvatar = async (avatarPath) => {
		try {
			const { data, error } = await supabase.storage
				.from('avatars')
				.download(avatarPath);

			if (error) throw error;

			const fileUrl = URL.createObjectURL(data);

			setAvatarUrl(fileUrl);
		} catch (error) {
			console.log('Error downloading image: ', error);
		}
	};

	const uploadAvatar = async (e) => {
		try {
			setUploading(true);

			if (!e.target.files || e.target.files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = e.target.files[0];

			const newFile = new File([file], `${userId}`, {
				type: file.type,
			});

			console.log(newFile);

			if (url) {
				const { error } = await supabase.storage
					.from('avatars')
					.update(newFile.name, newFile, {
						cacheControl: '3600',
						upsert: false,
					});

				if (error) throw error;
			} else {
				const { error } = await supabase.storage
					.from('avatars')
					.upload(newFile.name, newFile, { upsert: true });
				if (error) throw error;
			}
			const updates = {
				id: userId,
				avatar_url: newFile.name,
				updated_at: new Date().toISOString(),
			};
			const { error } = await supabase.from('profiles').upsert(updates);

			if (error) throw error;

			onUpload(newFile.name);
			fetchAvatar(newFile.name);
		} catch (error) {
			console.warn(error);
			alert('Error uploading avatar!');
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className=' flex align-middle justify-center'>
			{avatarUrl ? (
				<Image
					src={avatarUrl}
					alt='Avatar'
					className=' rounded-lg'
					height={size}
					width={size}
					placeholder={
						<div class='overflow-hidden relative w-10 h-10 bg-what-white rounded-lg dark:bg-base-gray'>
							<svg
								class='absolute -left-1 w-12 h-12 text-base-gray'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fill-rule='evenodd'
									d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
									clip-rule='evenodd'
								></path>
							</svg>
						</div>
					}
				/>
			) : null}
			<div className='flex justify-center'>
				<label
					className='button'
					htmlFor='single'
				>
					{uploading ? 'Enviando ...' : 'Subir'}
				</label>
				<input
					style={{
						visibility: 'hidden',
						position: 'absolute',
					}}
					type='file'
					id='single'
					accept='image/*'
					onChange={uploadAvatar}
					disabled={uploading}
				/>
			</div>
		</div>
	);
}
