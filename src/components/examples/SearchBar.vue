<template>
  <div class="relative w-full max-w-md">
    <!-- Search Input -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-10 pr-12 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sport-primary dark:focus:ring-sport-accent focus:border-transparent text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary transition-all duration-200"
        @input="handleInput"
        @focus="showSuggestions = true"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      
      <!-- Search Icon -->
      <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <svg class="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      <!-- Clear Button -->
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary hover:text-sport-primary dark:hover:text-sport-accent transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Search Suggestions -->
    <div
      v-if="showSuggestions && filteredSuggestions.length > 0"
      class="absolute top-full left-0 right-0 mt-1 bg-light-bg-primary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
    >
      <div
        v-for="(suggestion, index) in filteredSuggestions"
        :key="suggestion.id"
        :class="[
          'px-4 py-3 cursor-pointer transition-colors',
          index === selectedIndex 
            ? 'bg-sport-primary/10 dark:bg-sport-accent/10' 
            : 'hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary'
        ]"
        @click="selectSuggestion(suggestion)"
      >
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <svg class="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
              {{ suggestion.title }}
            </div>
            <div v-if="suggestion.category" class="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              in {{ suggestion.category }}
            </div>
          </div>
          <div v-if="suggestion.type" class="flex-shrink-0">
            <span class="text-xs px-2 py-1 bg-sport-primary/20 dark:bg-sport-accent/20 text-sport-primary dark:text-sport-accent rounded-full">
              {{ suggestion.type }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div
      v-if="showSuggestions && searchQuery && filteredSuggestions.length === 0"
      class="absolute top-full left-0 right-0 mt-1 bg-light-bg-primary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border rounded-lg shadow-lg z-50 p-4 text-center"
    >
      <div class="text-light-text-secondary dark:text-dark-text-secondary">
        No results found for "{{ searchQuery }}"
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

interface SearchSuggestion {
  id: string
  title: string
  category?: string
  type?: string
}

interface Props {
  placeholder?: string
  suggestions?: SearchSuggestion[]
}

interface Emits {
  (e: 'search', query: string): void
  (e: 'select', suggestion: SearchSuggestion): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search products, categories...',
  suggestions: () => [
    { id: '1', title: 'Nike Air Max', category: 'Shoes', type: 'Product' },
    { id: '2', title: 'Running Shoes', category: 'Footwear', type: 'Category' },
    { id: '3', title: 'Adidas', category: 'Brand', type: 'Brand' },
    { id: '4', title: 'Basketball', category: 'Sports', type: 'Category' },
    { id: '5', title: 'Workout Gear', category: 'Equipment', type: 'Category' },
  ]
})

const emit = defineEmits<Emits>()

const searchQuery = ref('')
const showSuggestions = ref(false)
const selectedIndex = ref(-1)

const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return props.suggestions
  
  return props.suggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    suggestion.category?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleInput = () => {
  selectedIndex.value = -1
  emit('search', searchQuery.value)
}

const handleBlur = () => {
  // Delay hiding suggestions to allow click events
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!showSuggestions.value) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredSuggestions.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
      break
    case 'Enter':
      event.preventDefault()
      if (selectedIndex.value >= 0) {
        selectSuggestion(filteredSuggestions.value[selectedIndex.value])
      } else {
        emit('search', searchQuery.value)
        showSuggestions.value = false
      }
      break
    case 'Escape':
      showSuggestions.value = false
      selectedIndex.value = -1
      break
  }
}

const selectSuggestion = (suggestion: SearchSuggestion) => {
  searchQuery.value = suggestion.title
  showSuggestions.value = false
  selectedIndex.value = -1
  emit('select', suggestion)
}

const clearSearch = () => {
  searchQuery.value = ''
  showSuggestions.value = false
  selectedIndex.value = -1
  emit('search', '')
}
</script>
