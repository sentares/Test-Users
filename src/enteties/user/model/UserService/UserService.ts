import { CreateUserDto, IUser } from 'enteties/user/interface/userType'
import { ISort } from 'features/filter/tsx/Filter'
import { useState } from 'react'
import { $api } from 'shared/api/api'
import { convertFileToString } from 'shared/lib/ConvertToString'

interface IUserService {
	getUsers: (str?: string, obj?: ISort) => Promise<IUser[]>
	deleteUser: (id: string) => Promise<void>
	postUser: (data: CreateUserDto) => Promise<IUser>
	isLoading: boolean
}

export function UserService(): IUserService {
	const [isLoading, setIsLoading] = useState(false)

	const getUsers = async (str?: string, obj?: ISort) => {
		try {
			setIsLoading(true)

			let url = '/users'

			if (str) {
				url += `?name=${encodeURIComponent(str)}`
			}

			if (obj) {
				const sortDirection = obj.sortProperty.replace('-', '')
				const orderBy = obj.sortProperty.includes('-') ? 'desc' : 'asc'

				if (str) {
					url += '&'
				} else {
					url += '?'
				}

				url += `sortBy=${sortDirection}&order=${orderBy}`
			}

			const response = await $api.get(url)
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
