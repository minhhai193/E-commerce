import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
	state: () => ({
		quantity: JSON.parse(localStorage.getItem("quantity") || "0"),
		cartList: JSON.parse(localStorage.getItem("cartList") || "[]"),
	}),

	getters: {},

	actions: {
		totalQuantity() {
			this.quantity = this.cartList.reduce(
				(total, item) => total + item.quantity,
				0
			);
			localStorage.setItem("quantity", this.quantity);
		},

		addProduct(product?: any) {
			const hasItem = this.cartList.find((item) => item.id === product.id);

			if (hasItem) {
				hasItem.quantity = Number(hasItem.quantity) + Number(product.quantity);
				this.cartList.forEach((item) => {
					if (item.id === hasItem.id) {
						item.quantity = hasItem.quantity;
					}
				});
			} else {
				this.cartList.push(product);
			}
			this.totalQuantity();
			localStorage.setItem("cartList", JSON.stringify(this.cartList));
		},

		deleteProduct(product: any) {
			this.cartList = this.cartList.filter((item) => item.id !== product.id);
			this.totalQuantity();
			localStorage.setItem("cartList", JSON.stringify(this.cartList));
		},

		addQuantity(product?: any) {
			const hasItem = this.cartList.find((item) => item.id === product.id);

			if (hasItem) {
				hasItem.quantity++;
				this.cartList.forEach((item) => {
					if (item.id === hasItem.id) {
						item.quantity = hasItem.quantity;
					}
				});
				this.totalQuantity();
				localStorage.setItem("cartList", JSON.stringify(this.cartList));
			}
		},

		minusQuantity(product?: any) {
			const hasItem = this.cartList.find((item) => item.id === product.id);

			if (hasItem) {
				hasItem.quantity--;
				this.cartList.forEach((item) => {
					if (item.id === hasItem.id) {
						item.quantity = hasItem.quantity;
					}
				});
				this.totalQuantity();
				localStorage.setItem("cartList", JSON.stringify(this.cartList));
			}
		},

		getQuantityItem(id: number) {
			const hasItem = this.cartList.find((item) => item.id === id);
			if (hasItem) {
				return hasItem.quantity;
			} else {
				return 1;
			}
		},
	},
});
