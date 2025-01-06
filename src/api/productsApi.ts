import axios from "axios";

const productsApi = {
	async getProducts(params: {
		limit?: number;
		offset?: number;
		title?: string;
		categoryId?: number;
	}) {
		try {
			const { limit, offset, title, categoryId } = params;
			let titleUrl = "";
			let categoryUrl = "";
			if (title !== "") titleUrl = `&title=${title}`;
			if (categoryId) categoryUrl = `&categoryId=${categoryId}`;
			const response = await axios.get(
				`https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}${titleUrl}${categoryUrl}`
			);

			return response.data;
		} catch (error) {
			console.error("Error:", error);
			return null;
		}
	},

	async getProductDetail(id: number) {
		try {
			const response = await axios.get(
				`https://api.escuelajs.co/api/v1/products/${id}`
			);

			return response.data;
		} catch (error) {
			console.error("Error:", error);
			return null;
		}
	},
};

export default productsApi;
