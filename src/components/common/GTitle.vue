<script setup>
const props = defineProps({
	text: {
		type: String,
		required: true,
	},
});
</script>
<template>
	<h2 class="text-center text-3xl text-white font-bold">
		{{ text }}
		<span class="block w-14 h-[2px] mx-auto mt-4 bg-primary"></span>
	</h2>
</template>
