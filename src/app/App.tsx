import { IUser, UserCard, UserService } from 'enteties/user'
import { CreateUserDto } from 'enteties/user/interface/userType'
import { useEffect, useState } from 'react'
import { CreateUserModal } from 'shared/modal'

function App() {
	const [usersArr, setUsersArr] = useState<[] | IUser[]>([])
	const [openModal, setOpenModal] = useState(false)

	function changeStateModal() {
		setOpenModal(!openModal)
	}

	const { getUsers, postUser, deleteUser, isLoading } = UserService()

	async function handleCreate(form: CreateUserDto) {
		changeStateModal()
		const createdUser = await postUser(form)
		if (createdUser) {
			setUsersArr(usersArr => [...usersArr, createdUser])
		}
	}

	async function handleClickDelete(id: string) {
		if (usersArr) {
			deleteUser(id)
			setUsersArr((prevUsers: IUser[] | []) => {
				if (prevUsers) {
					return prevUsers.filter(user => user.id !== id)
				}
				return []
			})
		}
	}

	useEffect(() => {
		;(async () => setUsersArr(await getUsers()))()
	}, [])

	return (
		<div className='App'>
			{isLoading ? (
				<div className='loading'>Loading...</div>
			) : (
				<>
					{openModal && (
						<CreateUserModal
							changeStateModal={changeStateModal}
							handleCreate={handleCreate}
						/>
					)}
					<button onClick={changeStateModal}>Create User</button>

					{usersArr?.length &&
						usersArr.map(user => (
							<UserCard
								key={user.id}
								user={user}
								handleClickDelete={handleClickDelete}
							/>
						))}
				</>
			)}
		</div>
	)
}

export default App
