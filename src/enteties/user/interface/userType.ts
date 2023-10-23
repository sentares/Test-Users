export interface IUser {
	id: string
	name: string
	lastName: string
	email: string
	avatar: string
}

export interface CreateUserDto {
	name: string
	lastName: string
	email: string
	avatar: File
}
