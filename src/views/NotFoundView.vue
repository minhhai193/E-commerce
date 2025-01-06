<script lang="ts" setup>
import { NotFoundIcon } from "@/components/icons";
import { GButton } from "@/components/common";

const onBack = () => {
	history.back();
};
</script>
<template>
	<div class="bg-white h-dvh">
		<div class="flex size-full items-center justify-center text-black">
			<div class="space-y-14 text-center">
				<div class="space-y-8">
					<NotFoundIcon />
					<p class="text-3xl">Page not found</p>
				</div>

				<GButton
					type="button"
					custom-class="w-[160px] h-[46px] font-semibold border border-[#6E7178] text-white"
					@click="onBack"
				>
					<template #text>
						<span>Go Back</span>
					</template>
				</GButton>
			</div>
		</div>
	</div>
</template>
