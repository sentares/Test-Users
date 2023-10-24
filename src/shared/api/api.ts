import axios from 'axios'

const URL = 'https://653670f1bb226bb85dd21f13.mockapi.io/TestUsers'

export const $api = axios.create({
	baseURL: URL,
	validateStatus: function (status) {
		return status >= 200 && status < 500
	},
})
