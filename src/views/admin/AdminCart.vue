<template>
  <div class="admin-page p-2">
    <!-- Page Header -->
    <div class="mb-4">
      <h1
        class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2"
      >
        Quản lý giỏ hàng
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Quản lý các giỏ hàng của khách hàng
      </p>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6 backdrop-blur-sm">
      <!-- Filter Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Bộ lọc giỏ hàng</h3>
            <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Sắp xếp theo</p>
          </div>
        </div>
        <button
          @click="clearAllFilters"
          class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Xóa bộ lọc
        </button>
      </div>

      <!-- Search Section -->
      <div class="mb-6">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm theo ID giỏ hàng hoặc tên khách hàng..."
            class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary placeholder:text-gray-400 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
          />
        </div>
      </div>

      <!-- Filter Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <!-- Date From Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Từ ngày
          </label>
          <input
            v-model="dateFrom"
            type="date"
            class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          />
        </div>

        <!-- Date To Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Đến ngày
          </label>
          <input
            v-model="dateTo"
            type="date"
            class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          />
        </div>

        <!-- Sort By Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
            </svg>
            Sắp xếp theo
          </label>
          <div class="relative">
            <select
              v-model="sortBy"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <option value="created_at">Ngày tạo</option>
              <option value="updated_at">Ngày cập nhật</option>
              <option value="total_amount">Tổng tiền</option>
              <option value="items_count">Số sản phẩm</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Sort Order Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
            </svg>
            Thứ tự
          </label>
          <div class="relative">
            <select
              v-model="sortOrder"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Filters Display -->
      <div v-if="hasActiveFilters" class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Bộ lọc đang áp dụng:</span>
          <div v-if="dateFrom" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
            <span>Từ: {{ dateFrom }}</span>
            <button @click="dateFrom = ''" class="ml-1 hover:text-blue-600">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div v-if="dateTo" class="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
            <span>Đến: {{ dateTo }}</span>
            <button @click="dateTo = ''" class="ml-1 hover:text-purple-600">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Summary -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Total Carts -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Tổng giỏ hàng</p>
            <p class="text-3xl font-bold">{{ statistics.total_carts || 0 }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Carts -->
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Giỏ hàng có sản phẩm</p>
            <p class="text-3xl font-bold">{{ statistics.active_carts || 0 }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Empty Carts -->
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium">Giỏ hàng trống</p>
            <p class="text-3xl font-bold">{{ statistics.empty_carts || 0 }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Items -->
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm font-medium">Tổng sản phẩm</p>
            <p class="text-3xl font-bold">{{ statistics.total_items || 0 }}</p>
            <p class="text-orange-200 text-xs mt-1">TB: {{ statistics.average_items_per_cart ? statistics.average_items_per_cart.toFixed(1) : '0' }}/giỏ</p>
          </div>
          <div class="p-3 bg-white/20 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Table -->
    <div class="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      <!-- Table Header -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Danh sách giỏ hàng</h3>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Tổng cộng {{ filteredCarts.length }} giỏ hàng</p>
            </div>
          </div>
          <button
            @click="refreshData"
            class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Làm mới
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="flex flex-col items-center gap-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="text-light-text-secondary dark:text-dark-text-secondary">Đang tải dữ liệu...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredCarts.length === 0" class="flex flex-col items-center justify-center py-12">
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Không có giỏ hàng nào</h3>
        <p class="text-light-text-secondary dark:text-dark-text-secondary text-center max-w-md">
          {{ searchQuery ? 'Không tìm thấy giỏ hàng phù hợp với từ khóa tìm kiếm.' : 'Chưa có giỏ hàng nào được tạo.' }}
        </p>
      </div>

      <!-- Table Content -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID Giỏ hàng</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Khách hàng</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Số sản phẩm</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tổng tiền</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ngày tạo</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="cart in paginatedCarts" :key="cart.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span class="text-white font-semibold text-sm">#{{ cart.id }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      Giỏ hàng #{{ cart.id }}
                    </div>
                    <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {{ formatDate(cart.created_at) }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      {{ cart.customer_name || 'Khách vãng lai' }}
                    </div>
                    <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {{ cart.customer_email || 'N/A' }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      {{ cart.total_items || 0 }}
                    </div>
                    <div class="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      sản phẩm
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-green-600 dark:text-green-400">
                  {{ formatCurrency(cart.total_amount || 0) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Hoạt động
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {{ formatDate(cart.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewCartDetails(cart)"
                    class="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                    title="Xem chi tiết"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>


                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
      <div class="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
        <span>Hiển thị {{ startIndex + 1 }}-{{ endIndex }} trong tổng số {{ totalItems }} giỏ hàng</span>
      </div>

      <div class="flex items-center space-x-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-all duration-200"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Trước
        </button>

        <div class="flex items-center space-x-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              page === currentPage
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-all duration-200"
        >
          Sau
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Cart Details Modal -->
    <div v-if="showCartModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click="closeCartModal">
      <div class="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" @click.stop>
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Chi tiết giỏ hàng #{{ selectedCart?.id }}</h3>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Thông tin chi tiết và sản phẩm</p>
            </div>
          </div>
          <button @click="closeCartModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div v-if="selectedCart" class="space-y-6">
            <!-- Customer Info -->
            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Thông tin khách hàng
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">Tên khách hàng</p>
                  <p class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ selectedCart.customer_name || 'Khách vãng lai' }}</p>
                </div>
                <div>
                  <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">Email</p>
                  <p class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ selectedCart.customer_email || 'N/A' }}</p>
                </div>
                <div>
                  <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">Ngày tạo</p>
                  <p class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ formatDate(selectedCart.created_at) }}</p>
                </div>
                <div>
                  <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">Ngày cập nhật</p>
                  <p class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ formatDate(selectedCart.updated_at) }}</p>
                </div>
              </div>
            </div>

            <!-- Cart Items -->
            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                Sản phẩm trong giỏ hàng
              </h4>
              <div v-if="selectedCart.items && selectedCart.items.length > 0" class="space-y-4">
                <div v-for="item in selectedCart.items" :key="item.id" class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                      <img
                        v-if="item.image || item.product_image"
                        :src="item.image || item.product_image || '/placeholder-image.jpg'"
                        :alt="item.product_name"
                        class="w-full h-full object-cover"
                        @error="($event.target as HTMLImageElement).style.display='none'"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h5 class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ item.product_name }}</h5>
                    <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ item.variant_name }}</p>
                    <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ formatCurrency(item.price) }} x {{ item.quantity }}</p>
                    <p v-if="item.stock_quantity !== undefined" class="text-xs text-gray-500 dark:text-gray-400">Tồn kho: {{ item.stock_quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-green-600 dark:text-green-400">{{ formatCurrency(item.price * item.quantity) }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"></path>
                </svg>
                <p class="text-light-text-secondary dark:text-dark-text-secondary">Giỏ hàng trống</p>
              </div>
            </div>

            <!-- Cart Summary -->
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                Tổng kết
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Tổng số sản phẩm:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ selectedCart.total_items || 0 }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Tổng tiền:</span>
                  <span class="font-bold text-xl text-green-600 dark:text-green-400">{{ formatCurrency(selectedCart.total_amount || 0) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button @click="closeCartModal" class="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useNotification } from '@/composables/useNotification'

// Types
interface Cart {
  id: number
  customer_name?: string
  customer_email?: string
  total_items: number
  total_amount: number
  created_at: string
  updated_at: string
  items?: CartItem[]
}

interface CartItem {
  id: number
  product_name: string
  product_image?: string
  variant_name: string
  price: number

  quantity: number
  image?: string
  stock_quantity?: number
}

// Notifications
import { useAuthStore } from '@/stores/auth';
const { showError } = useNotification()

// Data
const carts = ref<Cart[]>([])
const loading = ref(false)
const error = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filters
const searchQuery = ref('')
const dateFrom = ref('')
const dateTo = ref('')
const sortBy = ref('created_at')
const sortOrder = ref<'asc' | 'desc'>('desc')

// Modal
const showCartModal = ref(false)
const selectedCart = ref<Cart | null>(null)

// Statistics
const authStore = useAuthStore();
interface CartStatistics {
  total_carts: number
  active_carts: number
  empty_carts: number
  total_items: string
  average_items_per_cart: number
}

const statistics = ref<CartStatistics>({
  total_carts: 0,
  active_carts: 0,
  empty_carts: 0,
  total_items: '0',
  average_items_per_cart: 0
})

// API integration interfaces
interface ApiCartItem {
  id: number
  cart_id: number
  product_id: number
  quantity: number
  created_at: string
  updated_at: string
  product: {
    id: number
    name: string
    price: string
    discount_price: string
    category: any
    brand: any
  }
}

interface ApiCart {
  id: number
  user_id: number
  created_at: string
  updated_at: string
  user: {
    id: number
    name: string
    email: string
  }
  cart_items: ApiCartItem[]
}

interface ApiResponse {
  success: boolean
  data: {
    current_page: number
    data: ApiCart[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: any[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
  }
  message: string
}

// Computed
const hasActiveFilters = computed(() => {
  return !!(searchQuery.value || dateFrom.value || dateTo.value)
})

const filteredCarts = computed(() => {
  let filtered = [...carts.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(cart =>
      cart.id.toString().includes(query) ||
      cart.customer_name?.toLowerCase().includes(query) ||
      cart.customer_email?.toLowerCase().includes(query)
    )
  }

  // Date filters
  if (dateFrom.value) {
    filtered = filtered.filter(cart =>
      new Date(cart.created_at) >= new Date(dateFrom.value)
    )
  }

  if (dateTo.value) {
    filtered = filtered.filter(cart =>
      new Date(cart.created_at) <= new Date(dateTo.value)
    )
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue: any = a[sortBy.value as keyof Cart]
    let bValue: any = b[sortBy.value as keyof Cart]

    if (sortBy.value === 'created_at' || sortBy.value === 'updated_at') {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredCarts.value.length / itemsPerPage.value)
})

const paginatedCarts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCarts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }

  return pages
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage.value, filteredCarts.value.length)
})

const totalItems = computed(() => filteredCarts.value.length)



// Methods
const fetchStatistics = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/carts/statistics`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authStore.token}`,
        'X-CSRF-TOKEN': ''
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.success) {
      statistics.value = data.data
    } else {
      throw new Error('API returned unsuccessful response')
    }

  } catch (err) {
    console.error('Error loading statistics:', err)
    showError('Không thể tải thống kê giỏ hàng')
  }
}

const loadCarts = async () => {
  try {
    loading.value = true
    error.value = ''

    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      per_page: itemsPerPage.value.toString()
    })

    if (searchQuery.value) {
      params.append('search', searchQuery.value)
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/carts?${params}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authStore.token}`,
        'X-CSRF-TOKEN': ''
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()

    if (data.success) {
      // Transform API data to match existing Cart interface
      carts.value = data.data.data.map(apiCart => ({
        id: apiCart.id,
        customer_name: apiCart.user.name,
        customer_email: apiCart.user.email,
        total_items: apiCart.cart_items.length,
        total_amount: apiCart.cart_items.reduce((sum: number, item: ApiCartItem) =>
          sum + (parseFloat(item.product.discount_price) * item.quantity), 0
        ),
        created_at: apiCart.created_at,
        updated_at: apiCart.updated_at,
        items: apiCart.cart_items.map((item: ApiCartItem) => ({
          id: item.id,
          product_name: item.product.name,
          variant_name: `Sản phẩm #${item.product.id}`,
          price: parseFloat(item.product.discount_price),
          quantity: item.quantity
        }))
      }))
    } else {
      throw new Error('API returned unsuccessful response')
    }

  } catch (err) {
    error.value = 'Có lỗi xảy ra khi tải dữ liệu giỏ hàng'
    console.error('Error loading carts:', err)
    showError('Không thể tải danh sách giỏ hàng')
  } finally {
    loading.value = false
  }
}

const refreshData = () => {
  loadCarts()
  fetchStatistics()
}

const goToPage = (page: number | string) => {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const viewCartDetails = async (cart: Cart) => {
  loading.value = true
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/carts/${cart.id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authStore.token}`,
        'X-CSRF-TOKEN': ''
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.success) {
      selectedCart.value = {
        id: data.data.id,
        customer_name: data.data.user.name,
        customer_email: data.data.user.email,
        total_items: data.data.cart_items.length,
        total_amount: data.data.cart_items.reduce((sum: number, item: any) =>
          sum + (parseFloat(item.product.discount_price) * item.quantity), 0
        ),
        created_at: data.data.created_at,
        updated_at: data.data.updated_at,
        items: data.data.cart_items.map((item: any) => ({
          id: item.id,
          product_name: item.product.name,
          variant_name: `Sản phẩm #${item.product.id}`,
          price: parseFloat(item.product.discount_price),
          quantity: item.quantity,
          image: item.product.image,
          stock_quantity: item.product.stock_quantity
        }))
      }
      showCartModal.value = true
    } else {
      throw new Error('API returned unsuccessful response')
    }
  } catch (err) {
    error.value = 'Không thể tải chi tiết giỏ hàng'
    console.error('Error loading cart details:', err)
    showError('Không thể tải chi tiết giỏ hàng')
  } finally {
    loading.value = false
  }
}





const closeCartModal = () => {
  showCartModal.value = false
  selectedCart.value = null
}

const clearAllFilters = () => {
  searchQuery.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  sortBy.value = 'created_at'
  sortOrder.value = 'desc'
  currentPage.value = 1
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// Watchers
watch([searchQuery, dateFrom, dateTo, sortBy, sortOrder], () => {
  currentPage.value = 1
})

watch(error, (newError) => {
  if (newError) {
    showError(newError)
  }
})

// Lifecycle
onMounted(() => {
  loadCarts()
  fetchStatistics()
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

@media (prefers-color-scheme: dark) {
  .admin-page {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }
}
</style>