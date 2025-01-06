<script setup lang="ts">
import { ref, watch } from "vue";
import Paginate from "vuejs-paginate-next";

interface Props {
	currentPage: number;
	pageCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
	currentPage: 0,
	pageCount: 0,
});

const emit = defineEmits<{
	(e: "on-change-page", page: number): void;
}>();

const page = ref(props.currentPage);

watch(
	() => props.currentPage,
	(newValue) => {
		page.value = newValue + 1;
	},
	{
		immediate: true,
	}
);

const onClick = (page) => {
	emit("on-change-page", page - 1);
};
</script>
<template>
	<Paginate
		v-model="page"
		class="pagination"
		:page-count="pageCount"
		:click-handler="onClick"
		prev-text=""
		next-text=""
		prev-class="prev"
		next-class="next"
		container-class="className"
		first-last-button
		first-button-text=""
		last-button-text=""
	/>
</template>
<style scoped>
.pagination {
	display: flex;
	justify-content: center;
}
:deep(.page-item) {
	margin: 0 10px;
}
:deep(.page-item.active .page-link) {
	color: #789a41;
}
:deep(.page-link) {
	cursor: pointer;
	color: #fff;
}
:deep(.page-link:hover) {
	color: #789a41;
	transition: all 0.3s ease;
}
</style>
