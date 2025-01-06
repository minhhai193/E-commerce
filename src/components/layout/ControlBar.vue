<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();

const barList = ref([
	{
		icon: "fa-house",
		type: "home",
		isActive: false,
		name: "HomeView",
	},
	{
		icon: "fa-cart-shopping",
		type: "cart",
		isActive: false,
		name: "CartView",
	},
]);

const moveToPage = (name: any) => {
	router.push({
		name,
	});
};

const setActive = (name: any) => {
	barList.value.forEach((item) => {
		item.isActive = false;
	});
	switch (name) {
		case "HomeView":
			barList.value[0].isActive = true;
			break;

		case "CartView":
			barList.value[1].isActive = true;
			break;

		default:
			barList.value.forEach((item) => {
				item.isActive = false;
			});
			break;
	}
};

watch(
	() => route.name,
	(newVal) => {
		setActive(newVal);
	},
	{
		immediate: true,
	}
);
</script>
<template>
	<div
		class="fixed top-[50%] min-h-[200px] translate-y-[-50%] left-4 rounded-lg bg-[#3f3f3f] px-2 py-5 flex-col justify-center"
	>
		<ul>
			<li
				v-for="(item, index) in barList"
				:key="index"
				class="cursor-pointer p-3 rounded-lg hover:opacity-80 transition relative"
				:class="{ 'bg-primary': item.isActive }"
				@click="moveToPage(item.name)"
			>
				<i class="fa-solid" :class="item.icon"></i>
				<div
					v-if="item.type === 'cart' && cartStore.quantity > 0"
					class="absolute top-1 right-0 rounded-full flex items-center justify-center w-4 h-4 bg-[#352d2d] text-white text-xs transition"
				>
					{{ cartStore.quantity }}
				</div>
			</li>
		</ul>
	</div>
</template>
