import SearchUser from 'features/search/tsx/SearchUser'
import { Filter } from 'lucide-react'

interface ActionWithUserProps {
	callSearch: (str: string) => void
}

const ActionWithUser = (props: ActionWithUserProps) => {
	const { callSearch } = props
	return (
		<div>
			<SearchUser callSearch={callSearch} />
			<Filter />
		</div>
	)
}

export default ActionWithUser
