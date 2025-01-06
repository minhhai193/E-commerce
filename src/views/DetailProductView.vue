<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import productsApi from "@/api/productsApi.ts";
import { ref, watch } from "vue";
import { GButton } from "@/components/common";
import RelatedProducts from "@/components/product/RelatedProducts.vue";
import ProductSlider from "@/components/product/ProductSlider.vue";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const sizeList = [
	{
		size: "S",
		isChecked: true,
	},
	{
		size: "M",
		isChecked: false,
	},
	{
		size: "L",
		isChecked: false,
	},
];
const isCheckedSize = ref(sizeList[0].size);
const route = useRoute();
const router = useRouter();
const productItem: any = ref();
const quantity = ref(1);

const getProductDetail = async (id: number) => {
	const response = await productsApi.getProductDetail(id);
	if (response) {
		productItem.value = response;
	}
};

const moveToHome = (id: any) => {
	if (id) {
		router.push({
			name: "HomeView",
			query: {
				categoryId: id,
			},
		});
	} else {
		router.push({
			name: "HomeView",
		});
	}
};

const handleCheckedSize = (item: any) => {
	isCheckedSize.value = item.size;
};

const decreaseQuantity = () => {
	if (quantity.value > 1) {
		quantity.value--;
	}
};

const increaseQuantity = () => {
	quantity.value++;
};

const addToCart = () => {
	const product = {
		id: productItem.value?.id,
		title: productItem.value?.title,
		price: productItem.value?.price,
		size: isCheckedSize.value,
		quantity: quantity.value,
    image: productItem.value?.images[0]
	};
	cartStore.addProduct(product);
};

watch(
	() => route.params,
	async (newVal) => {
		if (newVal.id) {
			await getProductDetail(Number(newVal.id));
			quantity.value = cartStore.getQuantityItem(productItem.value?.id);
		}
	},
	{
		immediate: true,
	}
);
</script>

<template>
	<ul class="mb-4 flex flex-wrap text-sm">
		<li
			class="cursor-pointer hover:opacity-80 transition"
			@click="moveToHome(null)"
		>
			<i class="fa-solid fa-house mr-2"></i>Home<span class="mx-2">/</span>
		</li>
		<li
			class="cursor-pointer hover:opacity-80 transition"
			@click="moveToHome(productItem?.category?.id)"
		>
			{{ productItem?.category?.name }}<span class="mx-2">/</span>
		</li>
		<li>{{ productItem?.title }}</li>
	</ul>
	<div class="space-y-12">
		<div class="md:flex gap-6 mb-10">
			<ProductSlider :product-item="productItem" />
			<div class="flex-grow mt-4 md:mt-0">
				<h2 class="md:text-xl font-bold mb-1">{{ productItem?.title }}</h2>
				<div class="flex gap-1 md:gap-2 md:mb-4">
					<div
						v-for="(star, index) in 5"
						:key="index"
						class="text-[#bababa] md:text-xl"
						:class="{ '!text-[#d7d700]': index < 4 }"
					>
						&#9733;
					</div>
				</div>
				<p class="font-bold text-2xl md:text-4xl mb-4 md:mb-8">
					${{ productItem?.price }}
				</p>
				<div
					class="border-t border-b border-[#939393] pt-4 pb-6 md:pt-6 md:pb-8 space-y-2 mb-4 md:mb-6"
				>
					<p class="text-sm font-medium">Available Size</p>
					<div class="flex gap-3">
						<template v-for="item in sizeList">
							<input
								type="radio"
								:id="item.size"
								name="size"
								:value="item.size"
								:checked="item.isChecked"
								@change="handleCheckedSize(item)"
							/>
							<label :for="item.size">{{ item.size }}</label>
						</template>
					</div>
				</div>
				<div class="flex gap-6">
					<div class="flex rounded-md overflow-hidden">
						<button
							@click="decreaseQuantity"
							class="button_quantity"
							:disabled="quantity <= 1"
						>
							-
						</button>
						<input
							type="text"
							v-model="quantity"
							class="quantity_input pointer-events-none"
						/>
						<button @click="increaseQuantity" class="button_quantity">+</button>
					</div>
					<GButton
						type="button"
						custom-class="h-full px-3 bg-primary"
						@click="addToCart"
					>
						<template #text>
							<span>Add to cart</span>
						</template>
					</GButton>
				</div>
			</div>
		</div>

		<div>
			<p class="md:text-xl font-bold mb-4">The Details</p>
			<p class="text-sm md:text-[16px]">{{ productItem?.description }}</p>
		</div>

		<RelatedProducts :category-id="productItem?.category?.id" />
	</div>
</template>

<style scoped>
input[type="radio"] {
	display: none;
}
input[type="radio"] + label {
	position: relative;
	cursor: pointer;
	padding: 5px;
	border-radius: 6px;
	border: 1px solid #aaa;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
}

input[type="radio"]:checked + label {
	background-color: #fff;
	color: #000;
}

.button_quantity {
	font-size: 20px;
	padding: 3px 13px 6px;
	cursor: pointer;
	border-radius: 0 !important;
	background: #fff;
	color: #000;
	border: 1px solid #938e8e;
	outline: none;
}

.button_quantity:disabled {
	background-color: #b1b1b1; /* Màu cho nút bị vô hiệu hóa */
	cursor: not-allowed;
	color: #fff;
}

.quantity_input {
	outline: none;
	width: 50px;
	text-align: center;
	font-size: 18px;
	padding: 5px;
	border-top: 1px solid #938e8e;
	border-bottom: 1px solid #938e8e;
	background: #fff;
	color: #000;
}
</style>
