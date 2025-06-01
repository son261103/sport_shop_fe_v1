<template>
  <div class="relative">
    <!-- Search Icon Only Button -->
    <button 
      @click="expandSearch"
      class="header-icon p-1.5 text-light-text-secondary dark:text-dark-text-secondary transition-colors relative"
      :class="{ 'text-light-accent-sport dark:text-dark-accent-sport active-icon': isExpanded }"
    >
      <n-icon size="22">
        <SearchOutline />
      </n-icon>
    </button>

    <!-- Expanded Search Input -->
    <div 
      v-show="isExpanded"
      class="search-container dropdown-menu w-64 flex items-center bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg overflow-hidden"
      :class="{ 'show': isExpanded }"
    >
      <!-- Search Icon -->
      <div class="flex-shrink-0 pl-3">
        <n-icon size="16" class="text-light-text-muted dark:text-dark-text-muted">
          <SearchOutline />
        </n-icon>
      </div>

      <!-- Category Filter (Optional) -->
      <div v-if="showCategoryFilter" class="flex-shrink-0 pl-1">
        <select 
          v-model="selectedCategory" 
          class="text-xs bg-transparent border-0 text-light-text-secondary dark:text-dark-text-secondary focus:ring-0 py-1 pl-1 pr-6"
        >
          <option value="all">Tất cả</option>
          <option value="clothing">Quần áo</option>
          <option value="shoes">Giày</option>
          <option value="accessories">Phụ kiện</option>
        </select>
      </div>

      <!-- Search Input -->
      <input
        ref="searchInputRef"
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="flex-grow bg-transparent border-0 py-2.5 px-2 text-sm text-light-text-primary dark:text-dark-text-primary focus:ring-0 focus:outline-none"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.down.prevent="navigateSuggestion(1)"
        @keydown.up.prevent="navigateSuggestion(-1)"
        @keydown.enter="handleEnter"
        @keydown.esc="collapseSearch"
      />

      <!-- Clear Button -->
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="flex-shrink-0 p-1 mr-2 text-light-text-muted dark:text-dark-text-muted hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
      >
        <n-icon size="16">
          <CloseOutline />
        </n-icon>
      </button>
    </div>

    <!-- Suggestions Dropdown -->
    <div
      v-if="showSuggestions && filteredSuggestions.length > 0 && isExpanded"
      class="dropdown-menu w-64 max-h-60 overflow-y-auto show"
      style="top: calc(100% + 42px);"
    >
      <ul class="py-1">
        <li
          v-for="(suggestion, index) in filteredSuggestions"
          :key="index"
          @click="selectSuggestion(suggestion)"
          @mouseenter="highlightedIndex = index"
          class="dropdown-item cursor-pointer text-sm"
          :class="{
            'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary': highlightedIndex === index
          }"
        >
          <div class="flex items-center">
            <n-icon size="16" class="mr-2 text-light-accent-sport dark:text-dark-accent-sport">
              <SearchOutline />
            </n-icon>
            <span>{{ suggestion }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Backdrop when expanded -->
    <div
      v-if="isExpanded"
      @click="collapseSearch"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { NIcon } from 'naive-ui'
import { SearchOutline, CloseOutline } from '@vicons/ionicons5'

interface Props {
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
  showCategoryFilter?: boolean
  suggestions?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Tìm kiếm...',
  size: 'medium',
  showCategoryFilter: false,
  suggestions: () => []
})

const emit = defineEmits(['search', 'clear', 'focus', 'blur'])

// State
const searchQuery = ref('')
const selectedCategory = ref('all')
const isFocused = ref(false)
const showSuggestions = ref(false)
const highlightedIndex = ref(-1)
const isExpanded = ref(false)
const searchInputRef = ref<HTMLInputElement | null>(null)

// Computed
const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return []
  
  return props.suggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Methods
const handleFocus = () => {
  isFocused.value = true
  showSuggestions.value = true
  emit('focus')
}

const handleBlur = () => {
  isFocused.value = false
  // Don't hide suggestions immediately to allow clicking on them
  setTimeout(() => {
    if (!isFocused.value) {
      showSuggestions.value = false
    }
  }, 200)
  emit('blur')
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('clear')
  // Focus the input after clearing
  if (searchInputRef.value) {
    searchInputRef.value.focus()
  }
}

const navigateSuggestion = (direction: number) => {
  if (!filteredSuggestions.value.length) return
  
  const newIndex = highlightedIndex.value + direction
  
  if (newIndex >= filteredSuggestions.value.length) {
    highlightedIndex.value = 0
  } else if (newIndex < 0) {
    highlightedIndex.value = filteredSuggestions.value.length - 1
  } else {
    highlightedIndex.value = newIndex
  }
}

const handleEnter = () => {
  if (highlightedIndex.value >= 0 && filteredSuggestions.value.length > 0) {
    selectSuggestion(filteredSuggestions.value[highlightedIndex.value])
  } else {
    performSearch()
  }
}

const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  showSuggestions.value = false
  performSearch()
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', {
      query: searchQuery.value,
      category: selectedCategory.value
    })
    collapseSearch()
  }
}

const expandSearch = () => {
  isExpanded.value = true
  // Focus the input after expanding
  setTimeout(() => {
    if (searchInputRef.value) {
      searchInputRef.value.focus()
    }
  }, 100)
}

const collapseSearch = () => {
  isExpanded.value = false
  showSuggestions.value = false
}

// Handle clicks outside to collapse search
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (isExpanded.value && !target.closest('.search-container') && !target.closest('button')) {
    collapseSearch()
  }
}

// Watch for search query changes
watch(searchQuery, (newValue) => {
  if (newValue) {
    showSuggestions.value = true
  }
})

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Expose methods to parent component
defineExpose({
  clearSearch,
  performSearch,
  expandSearch,
  collapseSearch,
  focus: () => {
    expandSearch()
  }
})
</script>

<style scoped>
/* Search specific styles */
.search-container {
  min-width: 16rem;
}

.search-container input {
  background: transparent;
  border: none;
  outline: none;
}

.search-container input:focus {
  outline: none;
  box-shadow: none;
}

/* Override dropdown positioning for search */
.search-container.dropdown-menu {
  position: absolute;
  opacity: 1;
  visibility: visible;
  transform: none;
}
</style>
