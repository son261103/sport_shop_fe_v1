<template>
  <div class="bg-white dark:bg-dark-bg-secondary rounded-xl p-6 border border-light-border-primary dark:border-dark-border-primary">
    <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
      {{ title }}
    </h3>
    <div class="space-y-3">
      <div 
        v-for="order in orders" 
        :key="order.id"
        class="flex items-center justify-between p-3 rounded-lg bg-light-bg-secondary dark:bg-dark-bg-primary"
      >
        <div>
          <p class="font-medium text-light-text-primary dark:text-dark-text-primary">
            Order #{{ order.id }}
          </p>
          <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            {{ order.customer }}
          </p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-light-text-primary dark:text-dark-text-primary">
            ${{ order.amount }}
          </p>
          <span 
            class="text-xs px-2 py-1 rounded-full"
            :class="getStatusClass(order.status)"
          >
            {{ order.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Order {
  id: string
  customer: string
  amount: number
  status: string
}

interface Props {
  title?: string
  orders: Order[]
}

withDefaults(defineProps<Props>(), {
  title: 'Recent Orders'
})

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }
}
</script>