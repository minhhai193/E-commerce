<script setup lang="ts">
import { GSpinner } from "./";

interface Props {
	disabled?: boolean;
	customClass?: string;
	loading?: boolean;
}

defineProps<Props>();
</script>
<template>
	<button
		class="inline-flex h-[32px] min-w-16 items-center justify-center gap-1 rounded-md p-2 text-xm transition border-0"
		:class="[
			customClass,
			{ 'hover:opacity-80': !disabled, 'cursor-not-allowed': disabled },
			disabled ? '!border-gray-200 !bg-gray-400 !text-gray-600' : '',
		]"
		:disabled="disabled"
	>
		<div v-if="loading">
			<div>
				<GSpinner />
			</div>
		</div>
		<template v-else>
			<slot name="text" />
		</template>
	</button>
</template>
