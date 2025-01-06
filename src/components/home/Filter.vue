<script lang="ts" setup>
import categoriesApi from "@/api/categoriesApi.ts";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const categoriesList = ref<any[]>([]);
const params = {
	limit: 5,
};
const categoryId = ref();
const slidesPerView = ref(5)
const getCategories = async () => {
	const response = await categoriesApi.getCategories(params.limit);
	if (response) {
		categoriesList.value = response;
	}
};

const filterByCategory = (categoryId: number | undefined) => {
	router.push({
		name: "HomeView",
		query: {
			categoryId: categoryId,
		},
	});
};

const updateSlidesPerView = () => {
  // Check window width to set slidesPerView dynamically
  if (window.innerWidth < 768) {
    slidesPerView.value = 2; // 3 slides for small screens (mobile)
  } else {
    slidesPerView.value = 5; // 5 slides for larger screens
  }
}

onMounted(async () => {
  updateSlidesPerView();
  window.addEventListener("resize", updateSlidesPerView);
	await getCategories();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSlidesPerView);
})

watch(
	() => route.query,
	async () => {
		if (route.query.categoryId) {
			categoryId.value = Number(route.query.categoryId);
		} else {
			categoryId.value = null;
		}
	},
	{
		immediate: true,
	}
);
</script>
<template>
	<div class="mb-6">
		<swiper
			:slides-per-view="slidesPerView"
			:space-between="100"
			:navigation="true"
			:pagination="{ type: 'progressbar' }"
			:modules="[Pagination, Navigation]"
			class="!px-16 md:!px-14 !pb-6"
		>
			<swiper-slide
				class="filter_item transition hover:text-primary cursor-pointer"
				:class="{ active: !categoryId }"
				@click="filterByCategory(undefined)"
				>All</swiper-slide
			>
			<swiper-slide
				v-for="item in categoriesList"
				:key="item.id"
				class="transition hover:text-primary cursor-pointer filter_item"
				:class="{ active: categoryId === item.id }"
				@click="filterByCategory(item.id)"
				>{{ item.name }}</swiper-slide
			>
		</swiper>
	</div>
</template>
<style scoped>
:deep(.filter_item.active) {
	color: #789a41;
}
:deep(
		.swiper-horizontal > .swiper-pagination-progressbar,
		.swiper-pagination-progressbar.swiper-pagination-horizontal
	) {
	top: auto;
	bottom: 0;
}
:deep(.swiper-pagination-progressbar .swiper-pagination-progressbar-fill) {
	background-color: #789a41;
}
:deep(.swiper-button-next:after, .swiper-rtl .swiper-button-prev:after) {
	color: #fff;
	font-size: 18px;
}
:deep(.swiper-button-prev:after, .swiper-rtl .swiper-button-next:after) {
	color: #fff;
	font-size: 18px;
}
:deep(.swiper-button-next, .swiper-rtl .swiper-button-prev) {
	top: 15px;
}
:deep(.swiper-button-prev, .swiper-rtl .swiper-button-next) {
	top: 15px;
}
:deep(.swiper-button-disabled) {
	display: none;
}

</style>
