import { CreateUserDto, IUser } from 'enteties/user/interface/userType'
import { useState } from 'react'
import { $api } from 'shared/api/api'
import { convertFileToString } from 'shared/lib/ConvertToString'

interface IUserService {
	getUsers: (str?: string) => Promise<IUser[]>
	deleteUser: (id: string) => Promise<void>
	postUser: (data: CreateUserDto) => Promise<IUser>
	getUsersByName: (str: string) => Promise<any>
	isLoading: boolean
}

export function UserService(): IUserService {
	const [isLoading, setIsLoading] = useState(false)

	const getUsers = async (str?: string) => {
		try {
			setIsLoading(true)

			let url = '/users'
			if (str) {
				const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1)
				url += `?name=${capitalizedStr}`
			}

			const response = await $api.get(url)

			setIsLoading(false)
			return response.data
		} catch (e) {
			console.error(e)
		}
	}

	const getUsersByName = async (str: string) => {
		try {
			setIsLoading(true)

			const response = await $api.get(`/users?name=${str}`)
			setIsLoading(false)
			console.log(response.data)

			return response.data
		} catch (e) {
			console.log(e)
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

	return { getUsers, deleteUser, postUser, getUsersByName, isLoading }
}
