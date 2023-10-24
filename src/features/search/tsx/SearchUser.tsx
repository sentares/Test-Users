import { Search } from 'lucide-react'
import { useState } from 'react'
import cls from './SearchUser.module.css'

interface SearchUserProps {
	callSearch: (str: string) => void
}

const SearchUser = (props: SearchUserProps) => {
	const { callSearch } = props

	const [inputValue, setInputValue] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
		callSearch(event.target.value as string)
	}

	return (
		<div className={cls.searchUser}>
			<Search color='black' />
			<input
				type='text'
				value={inputValue}
				placeholder='Введите имя пользователя'
				onChange={handleInputChange}
				className={cls.searchInput}
			/>
		</div>
	)
}

export default SearchUser
