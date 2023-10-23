export async function convertFileToString(file: File): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()

		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result)
			} else {
				reject(new Error('Failed to read the file.'))
			}
		}

		reader.readAsDataURL(file)
	})
}
