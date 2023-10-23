import { CreateUserDto, IUser } from 'enteties/user/interface/userType'
import { useState } from 'react'
import { $api } from 'shared/api/api'
import { convertFileToString } from 'shared/lib/ConvertToString'

interface IUserService {
	getUsers: () => Promise<IUser[]>
	deleteUser: (id: string) => Promise<void>
	postUser: (data: CreateUserDto) => Promise<IUser>
	isLoading: boolean
}

export function UserService(): IUserService {
	const [isLoading, setIsLoading] = useState(false)

	const getUsers = async () => {
		try {
			setIsLoading(true)

			const response = await $api.get('/users')

			setIsLoading(false)
			return response.data
		} catch (e) {
			console.error(e)
		}
	}

	const deleteUser = async (id: string) => {
		try {
			setIsLoading(true)

			await $api.delete(`/users/${id}`)

			setIsLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	const postUser = async (data: CreateUserDto) => {
		try {
			setIsLoading(true)

			const fileString = await convertFileToString(data.avatar)
			const updatedData = { ...data, avatar: fileString }
			const response = await $api.post('/users', updatedData)

			setIsLoading(false)
			return response.data
		} catch (e) {
			console.log(e)
		}
	}

	return { getUsers, deleteUser, postUser, isLoading }
}
