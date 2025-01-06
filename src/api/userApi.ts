import axios from "axios";

interface LoginType {
	email: string;
	password: string;
}

const userApi = {
	async login(params: LoginType) {
		try {
			const response = await axios.post(
				"https://api.escuelajs.co/api/v1/auth/login",
				params
			);

			return response.data;
		} catch (error) {
			console.error("Error:", error);
			return null;
		}
	},

	async getUser() {
		try {
			const response = await axios.get(
				"https://api.escuelajs.co/api/v1/users/1"
			);

			return response.data;
		} catch (error) {
			console.error("Error:", error);
			return null;
		}
	},
};

export default userApi;
