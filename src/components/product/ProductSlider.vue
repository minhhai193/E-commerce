<script lang="ts" setup>
import { register } from "swiper/element";
import { Thumbs, FreeMode } from "swiper/modules";
import { onMounted, onUnmounted, ref } from "vue";

register();

interface Props {
	productItem?: any;
}

defineProps<Props>();

const isModalOpen = ref(false);

const currentImg = ref("");
const mainSlider = ref();
const thumbsSlider = ref();
const mainSliderParams = {
	modules: [Thumbs],
	rewind: true,
	spaceBetween: 4,
	speed: 500,
	thumbs: { swiper: ".slider_thumbs" },
};
const thumbsSliderParams = {
	modules: [FreeMode],
	slidesPerView: 4,
	spaceBetween: 10,
	freeMode: true,
	loop: false,
	watchSlidesProgress: true,
};

const showImageModal = (src: string) => {
	isModalOpen.value = true;
	currentImg.value = src;
};

const handleCloseModal = (event) => {
	if (event.key === "Escape" && isModalOpen.value) {
		isModalOpen.value = false;
	}
};

onMounted(async () => {
	Object.assign(mainSlider.value, mainSliderParams);
	mainSlider.value.initialize();

	Object.assign(thumbsSlider.value, thumbsSliderParams);
	thumbsSlider.value.initialize();

	window.addEventListener("keydown", handleCloseModal);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleCloseModal);
});
</script>
<template>
	<div class="slider min-w-[270px] md:w-2/5 space-y-3">
		<div class="slider_wrapper">
			<swiper-container ref="mainSlider" class="slider_main" init="false">
				<swiper-slide v-for="(item, index) in productItem?.images" :key="index">
					<img
						class="slider_img"
						:src="item"
						alt=""
						@click="showImageModal(item)"
					/>
				</swiper-slide>
			</swiper-container>
			<div class="slider_arrows">
				<button
					class="slider_arrow"
					type="button"
					@click="mainSlider.swiper.slidePrev()"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						width="20"
						height="20"
						viewBox="0 0 20 20"
					>
						<path stroke="currentColor" d="m13.5 17-7-7 7-7" />
					</svg>
				</button>
				<button
					class="slider_arrow"
					type="button"
					@click="mainSlider.swiper.slideNext()"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						width="20"
						height="20"
						viewBox="0 0 20 20"
					>
						<path stroke="currentColor" d="m6.5 3 7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
		<swiper-container ref="thumbsSlider" class="slider_thumbs" init="false">
			<swiper-slide
				class="slider_thumb"
				v-for="(item, index) in productItem?.images"
				:key="index"
			>
				<img class="slider_img cursor-pointer" :src="item" alt="" />
			</swiper-slide>
		</swiper-container>
	</div>

	<div v-if="isModalOpen" class="modal">
		<div class="modal-content flex justify-center items-center">
			<span @click="isModalOpen = false" class="close">&times;</span>
			<img :src="currentImg" alt="Modal Image" />
		</div>
	</div>
</template>
<style scoped>
/* Slider */
.slider_wrapper {
	position: relative;
}

.slider_main {
	margin-bottom: 4px;
}

.slider_arrows {
	position: absolute;
	inset: 24px;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	pointer-events: none;
}

.slider_arrow {
	pointer-events: auto;
	display: grid;
	place-content: center;
	width: 40px;
	aspect-ratio: 1;
	background: transparent;
	cursor: pointer;
	border: none;
	outline: none;
}

.slider_bullet {
	flex-shrink: 0;
	position: relative;
	width: 10px;
	aspect-ratio: 1;
	background: #fff;
	border-radius: 50%;
	transition: 0.25s;
	transition-property: transform, background, left;
	transform: scale(0.33);
}

.slider_bullet:has(+ .slider_bullet--active) {
	transform: scale(0.66);
}

.slider_bullet--active {
	transform: scale(1);
	background: #017ffe;
}

.slider_bullet--active + * {
	transform: scale(0.66);
}

.slider_thumb {
	opacity: 0.3;
	transition: opacity 0.25s;
}

.slider_thumb:hover {
	opacity: 0.6;
}

.slider_thumb.swiper-slide-thumb-active {
	opacity: 1;
}
.slider_main .slider_img {
	cursor: zoom-in;
}
.slider_img {
	display: block;
	width: 100%;
	aspect-ratio: 16/9;
	object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
}
.swiper-slide-active {
	position: relative;
	padding-bottom: 84%;
}
.slider_thumb {
	position: relative;
	padding-bottom: 20%;
}

/* Modal */
.modal {
	position: fixed;
	z-index: 1000;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7); /* Background overlay */
	display: flex;
	justify-content: center;
	align-items: center;
	transition: opacity 0.3s ease, visibility 0.3s ease;
}
.modal-content {
	position: relative;
	padding: 20px;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.modal img {
	width: 100%;
	max-height: 100%;
	object-fit: contain;
}

.close {
	position: absolute;
	top: 10px;
	right: 10px;
	color: #fff;
	font-size: 30px;
	font-weight: bold;
	cursor: pointer;
	transition: color 0.3s;
}

.close:hover,
.close:focus {
	color: #aaa;
}
</style>
