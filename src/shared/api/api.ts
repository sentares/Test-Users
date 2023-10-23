import axios from 'axios'

const URL = process.env.REACT_APP_API_HOST

export const $api = axios.create({
	baseURL: URL,
	validateStatus: function (status) {
		return status >= 200 && status < 500
	},
})
