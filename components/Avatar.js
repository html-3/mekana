import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { HiOutlineUserCircle, HiPlus } from 'react-icons/hi2';

export default function Avatar({ userId, url, size, onUpload }) {
	const supabase = useSupabaseClient();
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		if (url) fetchAvatar(url);
	}, [url]);

	const fetchAvatar = async (avatarPath) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(avatarPath);

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
				const { error } = await supabase.storage.from('avatars').update(newFile.name, newFile, {
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
		<div className='flex flex-col ml-20 space-y-2 pt-10 w-36'>
			{avatarUrl ? (
				<Image
					src={avatarUrl}
					alt='Avatar'
					className='rounded-full'
					height={size}
					width={size}
				/>
			) : (
				<HiOutlineUserCircle className='w-36 h-36 p-4 stroke-2 self-center bg-base-gray text-stone-black rounded-full mb-2' />
			)}
			<div className='flex justify-center'>
				<label className='button'>
					{!uploading ? <p>Subir</p> : <p>Enviando...</p>}
					<input
						id='file'
						className='hidden absolute'
						type='file'
						accept='image/*'
						onChange={uploadAvatar}
						disabled={uploading}
					/>
				</label>
			</div>
		</div>
	);
}
