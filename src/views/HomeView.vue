<script setup lang="ts">
import Filter from "@/components/home/Filter.vue";
import ProductList from "@/components/home/ProductList.vue";
</script>
<template>
  <div class="text-white space-y-2 mb-6">
    <h1 class="text-2xl md:text-4xl font-bold">SALES</h1>
    <p class="text-sm md:text-md text-[#b1b1b1]">A Great Way To Generate All The Motivation You Need To Get Fit</p>
  </div>

  <Filter />
  <ProductList />
</template>
