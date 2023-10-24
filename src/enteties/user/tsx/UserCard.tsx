import React from 'react'
import { IUser } from '../interface/userType'
import cls from './UserCard.module.css'

interface UserCardProps {
	user: IUser
	handleClickDelete: (id: string) => void
}

const UserCard: React.FC<UserCardProps> = ({ user, handleClickDelete }) => {
	return (
		<div className={cls.UserCard}>
			<img src={user.avatar} alt='avatar' className={cls.avatar} />
			<h1>
				{user.name} {user.lastName}
			</h1>
			<div>{user.email}</div>
			<button
				onClick={handleClickDelete.bind(null, user.id)}
				className={cls.deleteButton}
			>
				Delete User
			</button>
		</div>
	)
}

export default UserCard
