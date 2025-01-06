<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import ConntrolBar from "@/components/layout/ControlBar.vue";
import Footer from "@/components/layout/Footer.vue";
</script>
<template>
	<Header />

	<ConntrolBar class="md:flex hidden" />

	<div id="main-content" class="min-h-dvh pt-20 px-4 md:pl-24 md:pr-8 pb-14 max-w-[1920px] w-full mx-auto bg-[#151515]">
		<router-view v-slot="{ Component }">
			<component :is="Component" />
		</router-view>
	</div>

  <Footer />
</template>
