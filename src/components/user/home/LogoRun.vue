<template>
  <section class="logo-run py-12">
    <div class="container mx-auto">
      <div class="logo-slider flex items-center justify-between">
        <img src="@/assets/Nike.svg" alt="Nike" class="h-16 w-auto mx-4" />
        <img src="@/assets/adidas.svg" alt="Adidas" class="h-16 w-auto mx-4" />
        <img src="@/assets/Jordan.svg" alt="Jordan" class="h-16 w-auto mx-4" />
        <img src="@/assets/Vans.svg" alt="Vans" class="h-16 w-auto mx-4" />
        <img src="@/assets/Gucci.svg" alt="Gucci" class="h-16 w-auto mx-4" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style scoped>
.logo-slider {
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
</style>
