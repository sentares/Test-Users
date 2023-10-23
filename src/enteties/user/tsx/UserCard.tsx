import React, { useState } from 'react'
import { IUser } from '../interface/userType'
import { UserService } from '../model/UserService/UserService'
import cls from './UserCard.module.css'

interface UserCardProps {
	user: IUser
	handleClickDelete: (id: string) => void
}

const UserCard: React.FC<UserCardProps> = ({ user, handleClickDelete }) => {
	// function handleClickDelete(id: string) {}

	return (
		<div className={cls.UserCard}>
			<div>{user.name}</div>
			<button onClick={handleClickDelete.bind(null, user.id)}>
				Delete User
			</button>
		</div>
	)
}

export default UserCard
