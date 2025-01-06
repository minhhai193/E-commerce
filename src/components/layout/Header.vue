<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import userApi from "@/api/userApi.ts";
import { useRouter, useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const router = useRouter();
const route = useRoute();
const isShowMenu = ref(false);
const userDetail = ref();
const searchVal = ref("");
const infoRef = ref();
const categoryId: any = computed(() => route.query.categoryId);
const cartStore = useCartStore();

onClickOutside(infoRef, () => {
	isShowMenu.value = false;
});

const backToHome = () => {
	router.push({
		name: "HomeView",
	});
};

const onSubmit = () => {
	router.push({
		name: "HomeView",
		query: {
			title: searchVal.value,
			categoryId: categoryId.value,
		},
	});
};

onMounted(async () => {
	const response = await userApi.getUser();
	if (response) {
		userDetail.value = response;
	}
});
</script>
<template>
	<header
		class="z-10 fixed top-0 left-0 w-full flex items-center justify-between gap-4 px-2 md:px-4 py-2 text-white bg-[#242424]"
	>
		<div
			class="block w-[35px] md:w-[40px] cursor-pointer hover:opacity-80 transition"
			@click="backToHome"
		>
			<img src="../../assets/images/logo.png" alt="Logo" class="w-full" />
		</div>
		<div class="relative md:w-[40%]">
			<div
				class="absolute top-[calc(50%-12px)] left-[18px] transition hover:opacity-80 cursor-pointer"
				@click="onSubmit"
			>
				<i class="fa-solid fa-magnifying-glass"></i>
			</div>
			<input
				v-model="searchVal"
				placeholder="Search product name"
				class="w-full bg-[#121212] border border-[#868585] pl-10 md:pl-11 p-2 text-sm rounded-full"
				type="text"
				autocomplete="off"
				@keyup.enter="onSubmit"
			/>
		</div>
		<div class="flex gap-4 items-center">
			<p class="hidden md:block">{{ userDetail?.name }}</p>
			<div class="relative md:hidden">
				<i class="fa-solid fa-cart-shopping"></i>
				<div
					class="absolute top-[-5px] right-[-10px] rounded-full flex items-center justify-center w-4 h-4 bg-primary text-white text-xs"
				>
					{{ cartStore.quantity }}
				</div>
			</div>
			<div class="relative" ref="infoRef">
				<div
					class="h-[35px] w-[35px] rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition"
					@click="isShowMenu = !isShowMenu"
				>
					<img
						:src="userDetail?.avatar"
						:alt="userDetail?.name"
						class="w-full h-full object-cover"
					/>
				</div>
				<div
					v-if="isShowMenu"
					class="gap-2 flex items-center absolute right-0 top-[110%] bg-[#4C4D4D] rounded-md px-4 py-3 md:w-[160px] transition hover:bg-primary cursor-pointer text-sm md:text-[16px]"
				>
					<i class="fa-solid fa-right-from-bracket"></i>
					Logout
				</div>
			</div>
		</div>
	</header>
</template>
