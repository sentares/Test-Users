export interface ISort {
	name: string
	sortProperty: string
}

interface FilterProps {
	callFilter: (obj: ISort) => void
}

const Filter = (props: FilterProps) => {
	const { callFilter } = props

	const sortList: ISort[] = [
		{ name: 'Z-a', sortProperty: 'name' },
		{ name: 'A-z', sortProperty: '-name' },
	]

	const setOpenedListItem = (obj: ISort) => {
		callFilter(obj)
	}

	return (
		<div>
			<ul>
				{sortList.map((obj, i) => (
					<li
						key={i}
						onClick={() => setOpenedListItem(obj)}
						// className={
						// 	activeSort.sortProperty === obj.sortProperty ? 'active' : ''
						// }
					>
						{obj.name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Filter
