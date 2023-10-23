import React, { useState } from 'react'
import cls from './CreateUserModal.module.css'

interface CreateUserModalProps {
	changeStateModal: () => void
	handleCreate: (form: any) => void
}

const CreateUserModal = (props: CreateUserModalProps) => {
	const { changeStateModal, handleCreate } = props

	const [form, setForm] = useState({
		name: '',
		lastName: '',
		email: '',
		avatar: {},
	})
	const [imageURL, setImageURL] = useState<string>('')

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target
		setForm(prevForm => ({
			...prevForm,
			[name]: value,
		}))
	}

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files[0]) {
			const avatar = event.target.files[0]
			setForm(prevForm => ({
				...prevForm,
				avatar,
			}))
			setImageURL(URL.createObjectURL(avatar))
		}
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault()
		if (
			form.name &&
			form.lastName &&
			form.email &&
			form.avatar instanceof File
		) {
			handleCreate(form)
		} else {
			alert('Введите все данные')
		}
	}

	return (
		<div className={cls.modal}>
			<div className={cls.content}>
				<div className={cls.modalClose}>
					<h1 className={cls.title}>Create User</h1>
					<button className={cls.close} onClick={changeStateModal}>
						&times;
					</button>
				</div>
				<form className={cls.form} onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='name'
						name='name'
						value={form.name}
						onChange={handleInputChange}
					/>
					<input
						type='text'
						placeholder='last name'
						name='lastName'
						value={form.lastName}
						onChange={handleInputChange}
					/>
					<input
						type='text'
						placeholder='email'
						name='email'
						value={form.email}
						onChange={handleInputChange}
					/>
					<input type='file' onChange={handleFileChange} />
					{imageURL && (
						<img src={imageURL} alt='avatar' className={cls.avatar} />
					)}
					<button type='submit' className={cls.createUser}>
						Create
					</button>
				</form>
			</div>
		</div>
	)
}

export default CreateUserModal
