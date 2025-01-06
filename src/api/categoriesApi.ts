import axios from "axios";

const categoriesApi = {
	async getCategories(limit: number) {
		try {
			const response = await axios.get(
				`https://api.escuelajs.co/api/v1/categories?limit=${limit}`
			);

			return response.data;
		} catch (error) {
			console.error("Error:", error);
			return null;
		}
	},
};

export default categoriesApi;
