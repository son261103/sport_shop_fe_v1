<template>
  <div class="p-8 bg-light-bg-primary dark:bg-dark-bg-primary min-h-screen">
    <!-- Simple Test Section -->
    <section class="mb-12">
      <div class="bg-gradient-sport rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative max-w-3xl">
          <h1 class="text-4xl lg:text-6xl font-bold mb-4">
            Welcome to Sport Shop
          </h1>
          <p class="text-xl lg:text-2xl mb-8 opacity-90">
            Discover premium sports equipment and athletic wear designed for champions
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="btn-primary">
              Shop Now
            </button>
            <button class="btn-secondary">
              View Categories
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Simple Test Content -->
    <section class="mb-12">
      <div class="card">
        <div class="card-body">
          <h3 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            Simple Test Content
          </h3>
          <p class="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            This is a simple test to see if basic content renders properly.
          </p>
          <button class="btn-primary mr-4">
            Primary Button
          </button>
          <button class="btn-secondary">
            Secondary Button
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
// Simple test script
console.log('Home page loaded')
</script>


