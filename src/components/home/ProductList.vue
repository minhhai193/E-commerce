<script lang="ts" setup>
import productsApi from "@/api/productsApi.ts";
import { reactive, ref, watch } from "vue";
import { GPagination } from "@/components/common";
import { useRoute, useRouter } from "vue-router";

const params: any = reactive({
	offset: 0,
	limit: 12,
	title: "",
	categoryId: 0,
});

const route = useRoute();
const router = useRouter();
const productsList = ref<any[]>([]);

const getProducts = async () => {
	const response = await productsApi.getProducts(params);
	if (response) {
		productsList.value = response;
	}
};

const onChangePage = async (offset) => {
	params.offset = offset * 12;
	await getProducts();
};

const moveToDetail = (id: number) => {
	router.push({
		name: "DetailProductView",
		params: { id },
	});
};

watch(
	() => route.query,
	async () => {
		params.offset = 0;
		if (route.query.title) {
			params.title = String(route.query.title);
		} else {
			params.title = "";
		}
		if (route.query.categoryId) {
			params.categoryId = Number(route.query.categoryId);
		} else {
			params.categoryId = undefined;
		}
		await getProducts();
	},
	{
		immediate: true,
	}
);
</script>
<template>
	<div class="space-y-6">
		<ul class="grid md:grid-cols-4 gap-4 grid-cols-2">
			<li
				v-for="item in productsList"
				:key="item.id"
				class="rounded-xl overflow-hidden bg-[#121212] flex flex-col transition hover:opacity-80 cursor-pointer"
				@click="moveToDetail(item.id)"
			>
				<div class="relative pb-[100%]">
					<img
						:src="item.images[0]"
						:alt="item.title"
						class="w-full h-full object-cover absolute top-0 left-0"
					/>
				</div>
				<div
					class="relative space-y-4 p-4 flex flex-col justify-between flex-grow"
				>
					<div
						class="absolute top-[-20px] left-[15px] w-10 h-10 bg-white rounded-md overflow-hidden"
					>
						<img
							:src="item.category.image"
							:alt="item.category.name"
							class="w-full h-full object-cover absolute top-0 left-0"
						/>
					</div>
					<div
						class="absolute top-[-30px] right-[15px] px-3 py-1 text-white text-sm bg-[#242424] rounded-md min-w-[60px] text-center"
					>
						${{ item.price }}
					</div>
					<div class="space-y-1">
						<h3 class="font-bold text-sm md:text-md">{{ item.title }}</h3>
						<p class="text-content text-xs text-[#767676]">
							{{ item.description }}
						</p>
					</div>
					<ul class="flex flex-wrap gap-2 text-xs">
						<li class="rounded-md p-1 px-2 bg-primary">
							{{ item.category.name }}
						</li>
					</ul>
				</div>
			</li>
		</ul>
		<GPagination
			v-if="productsList.length > 11"
			:current-page="params.offset"
			:page-count="3"
			@on-change-page="onChangePage"
		/>
	</div>
</template>
<style scoped>
:deep(.text-content) {
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
