import cls from './LoadingModal.module.css'

const LoadingModal = () => {
	return (
		<div className={cls.loadingModal}>
			<div className={cls.content}>
				<h1>Loading...</h1>
			</div>
		</div>
	)
}

export default LoadingModal
