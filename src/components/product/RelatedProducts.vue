<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import productsApi from "@/api/productsApi.ts";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

interface Props {
	categoryId?: number;
}

const props = defineProps<Props>();
const router = useRouter();
const slidesPerView = ref(4);
const spaceBetween = ref(40);
const productsList = ref<any[]>([]);
const cartStore = useCartStore();
const params: any = reactive({
	offset: 0,
	limit: 20,
	title: "",
	categoryId: props.categoryId,
});

const getProducts = async (id: any) => {
	params.categoryId = id;
	const response = await productsApi.getProducts(params);
	if (response) {
		productsList.value = response;
	}
};

const moveToDetail = (id: number) => {
	router
		.push({
			name: "DetailProductView",
			params: { id },
		})
		.then(() => {
			window.scrollTo(0, 0);
		});
};

const updateSlidesPerView = () => {
	if (window.innerWidth < 768) {
		slidesPerView.value = 2;
		spaceBetween.value = 20;
	} else {
		spaceBetween.value = 40;
		slidesPerView.value = 4;
	}
};

const addCart = (item: any) => {
	const product = {
		id: item?.id,
		title: item?.title,
		price: item?.price,
		size: 'M',
		quantity: 1,
    image: item.images[0]
	};
	cartStore.addProduct(product);
};

watch(
	() => props.categoryId,
	async (newVal) => {
		await getProducts(newVal);
	},
	{
		immediate: true,
	}
);

onMounted(() => {
	updateSlidesPerView();
	window.addEventListener("resize", updateSlidesPerView);
});

onUnmounted(() => {
	window.removeEventListener("resize", updateSlidesPerView);
});
</script>
<template>
	<div class="space-y-4">
		<p class="md:text-xl font-bold mb-4">Related Products</p>
		<swiper
			:slides-per-view="slidesPerView"
			:space-between="spaceBetween"
			loop
			:modules="[Autoplay]"
			:autoplay="{
				delay: 2500,
				disableOnInteraction: false,
			}"
		>
			<swiper-slide v-for="item in productsList" :key="item.id">
				<div class="space-y-2">
					<div
						class="relative pb-[100%] rounded-md overflow-hidden cursor-pointer hover:opacity-70 transition"
						@click="moveToDetail(item.id)"
					>
						<img
							:src="item.images[0]"
							class="w-full h-full object-cover absolute top-0 left-0"
							:alt="item.title"
						/>
					</div>
					<div class="flex justify-between gap-2 items-center">
						<div class="">
							<p class="text-xs product_title">{{ item.title }}</p>
							<p class="font-bold">${{ item.price }}</p>
						</div>
						<div
							class="shrink-0 rounded-md w-8 h-8 flex items-center justify-center bg-[#585858] cursor-pointer hover:opacity-80 transition"
							@click="addCart(item)"
						>
							<i class="fa-solid fa-cart-shopping text-[#dedede] fa-xs"></i>
						</div>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>
<style scoped>
.product_title {
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
</style>
