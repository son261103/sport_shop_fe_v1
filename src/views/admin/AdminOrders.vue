<template>
  <div class="admin-page p-2">
    <!-- Page Header -->
    <div class="mb-4">
      <h1
        class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2"
      >
        Quản lý đơn hàng
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Quản lý các đơn hàng của khách hàng
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
            <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Bộ lọc đơn hàng</h3>
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
            placeholder="Tìm kiếm theo ID đơn hàng hoặc tên khách hàng..."
            class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary placeholder:text-gray-400 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
          />
        </div>
      </div>

      <!-- Filter Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <!-- Status Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Trạng thái
          </label>
          <div class="relative">
            <select
              v-model="statusFilter"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đã giao</option>
              <option value="delivered">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Payment Status Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Thanh toán
          </label>
          <div class="relative">
            <select
              v-model="paymentStatusFilter"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <option value="">Tất cả</option>
              <option value="pending">Chờ thanh toán</option>
              <option value="paid">Đã thanh toán</option>
              <option value="failed">Thất bại</option>
              <option value="refunded">Đã hoàn tiền</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Payment Method Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            Phương thức
          </label>
          <div class="relative">
            <select
              v-model="paymentMethodFilter"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <option value="">Tất cả phương thức</option>
              <option value="sepay">SePay</option>
              <option value="cod">Thanh toán khi nhận hàng</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
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
              <option value="status">Trạng thái</option>
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
          <div v-if="statusFilter" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
            <span>Trạng thái: {{ getStatusLabel(statusFilter) }}</span>
            <button @click="statusFilter = ''" class="ml-1 hover:text-green-600">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div v-if="paymentStatusFilter" class="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium">
            <span>Thanh toán: {{ getPaymentStatusLabel(paymentStatusFilter) }}</span>
            <button @click="paymentStatusFilter = ''" class="ml-1 hover:text-yellow-600">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div v-if="paymentMethodFilter" class="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-medium">
            <span>Phương thức: {{ getPaymentMethodLabel(paymentMethodFilter) }}</span>
            <button @click="paymentMethodFilter = ''" class="ml-1 hover:text-indigo-600">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
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
    <div v-if="statisticsError" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Không thể tải thống kê</h3>
            <p class="text-sm text-red-600 dark:text-red-400">{{ statisticsError }}</p>
          </div>
        </div>
        <button @click="fetchStatistics" class="px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 text-sm font-medium rounded-md transition-colors">
          Thử lại
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Total Orders -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Tổng đơn hàng</p>
            <div v-if="statisticsLoading" class="flex items-center gap-2">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span class="text-2xl font-bold">...</span>
            </div>
            <p v-else class="text-3xl font-bold">{{ statistics.total_orders || 0 }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Pending Orders -->
      <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-yellow-100 text-sm font-medium">Chờ xử lý</p>
            <div v-if="statisticsLoading" class="flex items-center gap-2">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span class="text-2xl font-bold">...</span>
            </div>
            <p v-else class="text-3xl font-bold">{{ statistics.pending_orders || 0 }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Delivered Orders -->
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Hoàn thành</p>
            <div v-if="statisticsLoading" class="flex items-center gap-2">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span class="text-2xl font-bold">...</span>
            </div>
            <p v-else class="text-3xl font-bold">{{ statistics.delivered_orders || 0 }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Revenue -->
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium">Tổng doanh thu</p>
            <div v-if="statisticsLoading" class="flex items-center gap-2">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span class="text-2xl font-bold">...</span>
            </div>
            <p v-else class="text-3xl font-bold">{{ formatCurrency(statistics.total_revenue || 0) }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
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
              <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Danh sách đơn hàng</h3>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Tổng cộng {{ filteredOrders.length }} đơn hàng</p>
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

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-12">
        <div class="p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Có lỗi xảy ra</h3>
        <p class="text-light-text-secondary dark:text-dark-text-secondary text-center max-w-md mb-4">{{ error }}</p>
        <button 
          @click="loadOrders" 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Thử lại
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredOrders.length === 0" class="flex flex-col items-center justify-center py-12">
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Không có đơn hàng nào</h3>
        <p class="text-light-text-secondary dark:text-dark-text-secondary text-center max-w-md">
          {{ searchQuery ? 'Không tìm thấy đơn hàng phù hợp với từ khóa tìm kiếm.' : 'Chưa có đơn hàng nào được tạo.' }}
        </p>
      </div>

      <!-- Table Content -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID Đơn hàng</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Khách hàng</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tổng tiền</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thanh toán</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ngày tạo</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span class="text-white font-semibold text-sm">#{{ order.id }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      Đơn hàng #{{ order.id }}
                    </div>
                    <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {{ formatDate(order.created_at) }}
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
                      {{ order.user?.name || 'Khách vãng lai' }}
                    </div>
                    <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {{ order.user?.email || 'N/A' }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-green-600 dark:text-green-400">
                  {{ formatCurrency(order.final_total || 0) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(order.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ getStatusLabel(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getPaymentStatusBadgeClass(order.payment_status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ getPaymentStatusLabel(order.payment_status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {{ formatDate(order.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewOrderDetails(order)"
                    class="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                    title="Xem chi tiết"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button
                    @click="updateOrderStatus(order)"
                    class="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                    title="Cập nhật trạng thái"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
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
        <span>Hiển thị {{ startIndex + 1 }}-{{ endIndex }} trong tổng số {{ totalItems }} đơn hàng</span>
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
            v-for="page in paginationPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              page === currentPage
                ? 'bg-blue-600 text-white shadow-md'
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

    <!-- Order Details Modal -->
     <OrderDetailsModal
       v-if="selectedOrder && showOrderModal"
       :show="showOrderModal"
       :order="selectedOrder"
       @close="closeOrderModal"
       @update-status="handleUpdateStatus"
     />

     <!-- Order Status Update Modal -->
     <OrderStatusUpdateModal
       v-if="selectedOrder && showStatusModal"
       :show="showStatusModal"
       :order="selectedOrder"
       @close="closeStatusModal"
       @update="handleStatusUpdate"
     />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useNotification } from '@/composables/useNotification'
import type { Order, OrderListParams } from '@/types/admin/order'
import OrderDetailsModal from '@/components/admin/orders/OrderDetailsModal.vue'
import OrderStatusUpdateModal from '@/components/admin/orders/OrderStatusUpdateModal.vue'
import { orderService } from '@/services/admin/orderService'

// Composables
const { showError, showSuccess } = useNotification()

// Reactive data
const orders = ref<Order[]>([])
const loading = ref(false)
const error = ref('')

// Statistics
interface OrderStatisticsData {
  total_orders: number
  pending_orders: number
  confirmed_orders: number
  processing_orders: number
  shipped_orders: number
  delivered_orders: number
  cancelled_orders: number
  total_revenue: string
}

const statistics = ref<OrderStatisticsData>({
  total_orders: 0,
  pending_orders: 0,
  confirmed_orders: 0,
  processing_orders: 0,
  shipped_orders: 0,
  delivered_orders: 0,
  cancelled_orders: 0,
  total_revenue: '0'
})

const statisticsLoading = ref(false)
const statisticsError = ref('')

// Filters
const searchQuery = ref('')
const statusFilter = ref('')
const paymentStatusFilter = ref('')
const paymentMethodFilter = ref('')

// Watch for filter changes to reload data
watch([statusFilter, paymentStatusFilter, paymentMethodFilter, searchQuery], () => {
  currentPage.value = 1
  loadOrders()
}, { immediate: false })
const dateFrom = ref('')
const dateTo = ref('')
const sortBy = ref('created_at')
const sortOrder = ref('desc')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modal state
const showOrderModal = ref(false)
const showStatusModal = ref(false)
const selectedOrder = ref<Order | null>(null)

// API Integration interfaces (placeholder for when API is provided)
interface ApiOrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: string
  product?: {
    id: number
    name: string
    image?: string
  }
}



// Computed properties
const hasActiveFilters = computed(() => {
  return statusFilter.value || paymentStatusFilter.value || dateFrom.value || dateTo.value
})

const filteredOrders = computed(() => {
  let filtered = [...orders.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.id.toString().includes(query) ||
      order.user?.name?.toLowerCase().includes(query) ||
      order.user?.email?.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (statusFilter.value) {
    filtered = filtered.filter(order => order.status === statusFilter.value)
  }

  // Payment status filter
  if (paymentStatusFilter.value) {
    filtered = filtered.filter(order => order.payment_status === paymentStatusFilter.value)
  }

  // Date filters
  if (dateFrom.value) {
    filtered = filtered.filter(order => new Date(order.created_at) >= new Date(dateFrom.value))
  }
  if (dateTo.value) {
    filtered = filtered.filter(order => new Date(order.created_at) <= new Date(dateTo.value))
  }

  // Sort
  filtered.sort((a: any, b: any) => {
    let aValue = a[sortBy.value]
    let bValue = b[sortBy.value]
    
    if (sortBy.value === 'final_total' || sortBy.value === 'total_price') {
      aValue = parseFloat(aValue || '0')
      bValue = parseFloat(bValue || '0')
    }
    
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return filtered
})

// Pagination computed properties
const totalItems = computed(() => filteredOrders.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalItems.value))

const paginatedOrders = computed(() => {
  return filteredOrders.value.slice(startIndex.value, startIndex.value + itemsPerPage.value)
})

const paginationPages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const loadOrders = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Build API parameters
    const params: OrderListParams = {}
    if (statusFilter.value) params.status = statusFilter.value as any
    if (paymentStatusFilter.value) params.payment_status = paymentStatusFilter.value as any
    if (paymentMethodFilter.value) params.payment_method = paymentMethodFilter.value as any
    if (searchQuery.value) params.search = searchQuery.value
    
    // Call API
    const response = await orderService.getOrders(params)
    orders.value = response.data
    
  } catch (err: any) {
    error.value = err.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng'
    showError('Không thể tải danh sách đơn hàng')
    
    // Fallback to empty array on error
    orders.value = []
  } finally {
    loading.value = false
  }
}

const fetchStatistics = async () => {
  try {
    statisticsLoading.value = true
    statisticsError.value = ''
    
    // Call API for statistics
    const response = await orderService.getOrderStatistics()
    statistics.value = {
      total_orders: response.data.total_orders,
      pending_orders: response.data.pending_orders,
      confirmed_orders: response.data.confirmed_orders,
      processing_orders: response.data.processing_orders,
      shipped_orders: response.data.shipped_orders,
      delivered_orders: response.data.delivered_orders,
      cancelled_orders: response.data.cancelled_orders,
      total_revenue: response.data.total_revenue
    }
  } catch (err: any) {
    statisticsError.value = err.message || 'Không thể tải thống kê'
    
    // Fallback to calculate from current orders data
    statistics.value = {
      total_orders: orders.value.length,
      pending_orders: orders.value.filter((order: any) => order.status === 'pending').length,
      confirmed_orders: orders.value.filter((order: any) => order.status === 'confirmed').length,
      processing_orders: orders.value.filter((order: any) => order.status === 'processing').length,
      shipped_orders: orders.value.filter((order: any) => order.status === 'shipped').length,
      delivered_orders: orders.value.filter((order: any) => order.status === 'delivered').length,
      cancelled_orders: orders.value.filter((order: any) => order.status === 'cancelled').length,
      total_revenue: orders.value.reduce((sum: number, order: any) => {
        return sum + (order.final_total || order.total_price || 0)
      }, 0).toString()
    }
    showError('Không thể tải thống kê đơn hàng từ API, sử dụng dữ liệu tính toán')
  } finally {
    statisticsLoading.value = false
  }
}

const refreshData = async () => {
  await loadOrders()
  await fetchStatistics()
}

const clearAllFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  paymentStatusFilter.value = ''
  paymentMethodFilter.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  sortBy.value = 'created_at'
  sortOrder.value = 'desc'
  currentPage.value = 1
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const viewOrderDetails = (order: Order) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const closeOrderModal = () => {
  showOrderModal.value = false
  selectedOrder.value = null
}

const handleUpdateStatus = (order: Order) => {
  selectedOrder.value = order
  showOrderModal.value = false
  showStatusModal.value = true
}

const closeStatusModal = () => {
  showStatusModal.value = false
  selectedOrder.value = null
}

const handleStatusUpdate = async (data: { orderId: number, status: string, paymentStatus: string, note?: string }) => {
  try {
    // Call API to update order status
    await orderService.updateOrderStatus(data.orderId, {
      status: data.status as any,
      notes: data.note
    })
    console.log('Updating order status:', data)
    
    // Update local data
    const orderIndex = orders.value.findIndex(o => o.id === data.orderId)
    if (orderIndex !== -1) {
      orders.value[orderIndex].status = data.status as any
      orders.value[orderIndex].payment_status = data.paymentStatus as any
      orders.value[orderIndex].updated_at = new Date().toISOString()
    }
    
    showSuccess('Cập nhật trạng thái đơn hàng thành công!')
    closeStatusModal()
  } catch (error) {
    console.error('Error updating order status:', error)
    showError('Có lỗi xảy ra khi cập nhật trạng thái!')
  }
}

const updateOrderStatus = (order: Order) => {
  // TODO: Implement order status update
  console.log('Update order status:', order)
}

// Utility functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (amount: string | number) => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(numAmount)
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Chờ xử lý',
    confirmed: 'Đã xác nhận',
    processing: 'Đang xử lý',
    shipped: 'Đã giao',
    delivered: 'Hoàn thành',
    cancelled: 'Đã hủy'
  }
  return labels[status] || status
}

const getStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    shipped: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
}

const getPaymentStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Chờ thanh toán',
    paid: 'Đã thanh toán',
    failed: 'Thất bại',
    refunded: 'Đã hoàn tiền'
  }
  return labels[status] || status
}

const getPaymentMethodLabel = (method: string) => {
  const labels: Record<string, string> = {
    cash: 'Tiền mặt',
    bank_transfer: 'Chuyển khoản',
    credit_card: 'Thẻ tín dụng',
    e_wallet: 'Ví điện tử'
  }
  return labels[method] || method
}

const getPaymentStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    refunded: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
}

// Watchers
watch([searchQuery, statusFilter, paymentStatusFilter, dateFrom, dateTo, sortBy, sortOrder], () => {
  currentPage.value = 1
})

watch(error, (newError) => {
  if (newError) {
    showError(newError)
  }
})

// Lifecycle
onMounted(() => {
  loadOrders()
  fetchStatistics()
})
</script>
