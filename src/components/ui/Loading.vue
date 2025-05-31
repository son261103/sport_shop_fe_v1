<template>
  <div
    class="loading-container"
    :class="[
      `loading-${size}`,
      fullscreen && 'loading-fullscreen'
    ]"
  >
    <!-- Circular Loading Spinner -->
    <div
      class="loading-spinner"
      :class="[
        `spinner-${size}`,
        `spinner-${color}`
      ]"
    >
      <!-- Main Spinner Circle -->
      <div class="spinner-circle">
        <!-- Outer Ring -->
        <div class="spinner-ring spinner-ring-outer"></div>
        <!-- Inner Ring -->
        <div class="spinner-ring spinner-ring-inner"></div>
        <!-- Center Dot -->
        <div class="spinner-dot"></div>
      </div>
    </div>

    <!-- Loading Text -->
    <div
      v-if="text"
      class="loading-text"
      :class="[
        `text-${size}`,
        'text-light-text-secondary dark:text-dark-text-secondary'
      ]"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'sport' | 'primary' | 'secondary' | 'white'
  text?: string
  fullscreen?: boolean
}

withDefaults(defineProps<LoadingProps>(), {
  size: 'md',
  color: 'sport',
  text: '',
  fullscreen: false
})
</script>

<style scoped>
/* Loading Container */
.loading-container {
  @apply flex flex-col items-center justify-center gap-4;
}

.loading-fullscreen {
  @apply fixed inset-0 bg-light-bg-primary/90 dark:bg-dark-bg-primary/90 backdrop-blur-md z-50;
}

/* Circular Loading Spinner */
.loading-spinner {
  @apply relative flex items-center justify-center;
}

.spinner-circle {
  @apply relative flex items-center justify-center;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

.spinner-ring {
  @apply absolute rounded-full border-2 border-transparent;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.spinner-ring-outer {
  animation: spin-outer 2s linear infinite;
  border-top-color: currentColor;
  border-right-color: currentColor;
  opacity: 0.8;
}

.spinner-ring-inner {
  animation: spin-inner 1.5s linear infinite reverse;
  border-bottom-color: currentColor;
  border-left-color: currentColor;
  opacity: 0.6;
}

.spinner-dot {
  @apply absolute rounded-full;
  animation: pulse-dot 2s ease-in-out infinite;
}

/* Spinner Sizes */
.spinner-sm .spinner-ring-outer {
  @apply w-8 h-8;
}

.spinner-sm .spinner-ring-inner {
  @apply w-5 h-5;
}

.spinner-sm .spinner-dot {
  @apply w-1.5 h-1.5;
}

.spinner-md .spinner-ring-outer {
  @apply w-12 h-12;
}

.spinner-md .spinner-ring-inner {
  @apply w-8 h-8;
}

.spinner-md .spinner-dot {
  @apply w-2 h-2;
}

.spinner-lg .spinner-ring-outer {
  @apply w-16 h-16;
}

.spinner-lg .spinner-ring-inner {
  @apply w-11 h-11;
}

.spinner-lg .spinner-dot {
  @apply w-3 h-3;
}

.spinner-xl .spinner-ring-outer {
  @apply w-20 h-20;
}

.spinner-xl .spinner-ring-inner {
  @apply w-14 h-14;
}

.spinner-xl .spinner-dot {
  @apply w-4 h-4;
}

/* Spinner Colors */
.spinner-sport {
  @apply text-light-accent-sport dark:text-dark-accent-sport;
}

.spinner-sport .spinner-dot {
  @apply bg-light-accent-sport dark:bg-dark-accent-sport;
}

.spinner-primary {
  @apply text-light-text-primary dark:text-dark-text-primary;
}

.spinner-primary .spinner-dot {
  @apply bg-light-text-primary dark:bg-dark-text-primary;
}

.spinner-secondary {
  @apply text-light-text-secondary dark:text-dark-text-secondary;
}

.spinner-secondary .spinner-dot {
  @apply bg-light-text-secondary dark:bg-dark-text-secondary;
}

.spinner-white {
  @apply text-white;
}

.spinner-white .spinner-dot {
  @apply bg-white;
}

/* Hover Effects */
.loading-spinner:hover .spinner-circle {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.loading-spinner:hover .spinner-ring-outer {
  animation-duration: 1.5s;
}

.loading-spinner:hover .spinner-ring-inner {
  animation-duration: 1s;
}

/* Loading Text */
.loading-text {
  @apply font-medium tracking-wide;
  animation: text-fade 3s ease-in-out infinite;
}

.text-sm {
  @apply text-xs;
}

.text-md {
  @apply text-sm;
}

.text-lg {
  @apply text-base;
}

.text-xl {
  @apply text-lg;
}

/* Circular Spinner Animations */
@keyframes spin-outer {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-inner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse-dot {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes text-fade {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .loading-fullscreen {
    @apply backdrop-blur-sm;
  }

  .loading-container {
    @apply gap-3;
  }

  /* Smaller spinners on mobile */
  .spinner-lg .spinner-ring-outer {
    @apply w-12 h-12;
  }

  .spinner-lg .spinner-ring-inner {
    @apply w-8 h-8;
  }

  .spinner-xl .spinner-ring-outer {
    @apply w-16 h-16;
  }

  .spinner-xl .spinner-ring-inner {
    @apply w-11 h-11;
  }
}
</style>
