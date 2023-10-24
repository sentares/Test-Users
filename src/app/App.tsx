import { IUser, UserCard, UserService } from 'enteties/user'
import { CreateUserDto } from 'enteties/user/interface/userType'
import { ISort } from 'features/filter/tsx/Filter'
import SearchUser from 'features/search/tsx/SearchUser'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import { CreateUserModal } from 'shared/modal'
import ActionWithUser from 'widgets/action/ActionWithUser'

function App() {
	const [usersArr, setUsersArr] = useState<[] | IUser[]>([])
	const [openModal, setOpenModal] = useState(false)
	const [searchStr, setSearchStr] = useState('')
	const [objSort, setObjSort] = useState({ name: 'A-z', sortProperty: '-name' })

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

	const callSearch = useCallback(
		debounce(str => {
			;(async () => setUsersArr(await getUsers(str, objSort)))()
			setSearchStr(str)
		}, 700),
		[]
	)

	const calFilter = (obj: ISort) => {
		;(async () => setUsersArr(await getUsers(searchStr, obj)))()
		setObjSort(obj)
	}

	return (
		<div className='App'>
			{openModal && (
				<CreateUserModal
					changeStateModal={changeStateModal}
					handleCreate={handleCreate}
				/>
			)}

			<div className='actioinsBlock'>
				<ActionWithUser callSearch={callSearch} callFilter={calFilter} />
				<button onClick={changeStateModal} className='createUser'>
					Create User
				</button>
			</div>

			<div className='usersList'>
				{usersArr?.length &&
					!isLoading &&
					usersArr.map(user => (
						<UserCard
							key={user.id}
							user={user}
							handleClickDelete={handleClickDelete}
						/>
					))}
			</div>
		</div>
	)
}

export default App
