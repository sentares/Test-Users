import cls from './Action.module.css'

import Filter, { ISort } from 'features/filter/tsx/Filter'
import SearchUser from 'features/search/tsx/SearchUser'

interface ActionWithUserProps {
	callSearch: (str: string) => void
	callFilter: (obj: ISort) => void
}

const ActionWithUser = (props: ActionWithUserProps) => {
	const { callSearch, callFilter } = props

	return (
		<div className={cls.ActionWithUser}>
			<SearchUser callSearch={callSearch} />
			<Filter callFilter={callFilter} />
		</div>
	)
}

export default ActionWithUser
