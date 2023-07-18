import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://api.jsonbin.io/v3",
	timeout: 2000,
	headers: {
		"X-Access-Key": "",
	},
});
