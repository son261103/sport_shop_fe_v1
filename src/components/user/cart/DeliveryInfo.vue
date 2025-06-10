<template>
  <div class="max-w-4xl mx-auto">
    <div data-aos="fade-up" class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-2xl p-8 shadow-card border border-light-border-primary dark:border-dark-border-primary">
      <h2 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
        <i class="fas fa-user-edit mr-3 text-light-accent-sport dark:text-dark-accent-sport"></i>
        Thông tin giao hàng
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Họ và tên <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            :value="deliveryInfo.fullName"
            @input="updateField('fullName', ($event.target as HTMLInputElement).value)"
            class="w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border border-light-border-primary dark:border-dark-border-primary rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:border-transparent"
            placeholder="Nhập họ và tên"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Số điện thoại <span class="text-red-500">*</span>
          </label>
          <input 
            type="tel" 
            :value="deliveryInfo.phone"
            @input="updateField('phone', ($event.target as HTMLInputElement).value)"
            class="w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border border-light-border-primary dark:border-dark-border-primary rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:border-transparent"
            placeholder="Nhập số điện thoại"
          >
        </div>
        
        <div class="dropdown-container">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Tỉnh/Thành phố <span class="text-red-500">*</span>
          </label>
          <select 
            :value="deliveryInfo.provinceCode || ''"
            @change="handleProvinceChange"
            :disabled="loading"
            class="w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border border-light-border-primary dark:border-dark-border-primary rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">{{ loading ? 'Đang tải...' : 'Chọn tỉnh/thành phố' }}</option>
            <option v-for="province in provincesForSelect" :key="province.code" :value="province.code">
              {{ province.name }}
            </option>
          </select>
          <div v-if="error" class="text-red-500 text-sm mt-1">
            {{ error }}
          </div>
        </div>
        
        <div class="dropdown-container">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Quận/Huyện <span class="text-red-500">*</span>
          </label>
          <select 
            :value="deliveryInfo.districtCode || ''"
            @change="handleDistrictChange"
            :disabled="!deliveryInfo.provinceCode || loading"
            class="w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border border-light-border-primary dark:border-dark-border-primary rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">
              {{ !deliveryInfo.provinceCode ? 'Vui lòng chọn tỉnh/thành phố trước' : 
                 loading ? 'Đang tải...' : 
                 'Chọn quận/huyện' }}
            </option>
            <option v-for="district in districtsForSelect" :key="district.code" :value="district.code">
              {{ district.name }}
            </option>
          </select>
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Địa chỉ chi tiết <span class="text-red-500">*</span>
          </label>
          <textarea 
            :value="deliveryInfo.address"
            @input="updateField('address', ($event.target as HTMLTextAreaElement).value)"
            rows="3"
            class="w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border border-light-border-primary dark:border-dark-border-primary rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:border-transparent resize-none"
            placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường...)"
          ></textarea>
        </div>
      </div>
      
      <div class="flex justify-between mt-8">
        <button 
          @click="$emit('goBack')"
          class="flex items-center gap-2 px-6 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary text-light-text-primary dark:text-dark-text-primary rounded-xl hover:bg-light-border-primary dark:hover:bg-dark-border-primary transition-all duration-200 font-medium border border-light-border-primary dark:border-dark-border-primary"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Quay lại</span>
        </button>
        
        <button 
          @click="$emit('proceedToNextStep')"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-sport text-white rounded-xl hover:shadow-sport transition-all duration-300 font-medium transform hover:scale-105"
        >
          <span>Tiếp tục</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted} from 'vue'
import { useProvinces } from '@/composables/useProvinces'

interface DeliveryInfo {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  address: string;
  provinceCode?: number;
  districtCode?: number;
}

interface Props {
  deliveryInfo: DeliveryInfo;
}

interface Emits {
  'update:deliveryInfo': [info: DeliveryInfo];
  goBack: [];
  proceedToNextStep: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Use provinces composable
const {
  provinces,
  districts,
  loading,
  error,
  provincesForSelect,
  districtsForSelect,
  fetchProvinces,
  fetchDistricts,
  clearDistricts
} = useProvinces()

// Load provinces on component mount
onMounted(() => {
  fetchProvinces()
})

const updateField = (field: keyof DeliveryInfo, value: string) => {
  const updatedInfo = { ...props.deliveryInfo, [field]: value };
  emit('update:deliveryInfo', updatedInfo);
};

// Handle province change
const handleProvinceChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const selectedCode = parseInt(target.value)
  
  if (selectedCode) {
    const selectedProvince = provinces.value.find(p => p.code === selectedCode)
    if (selectedProvince) {
      const updatedInfo = { 
        ...props.deliveryInfo, 
        province: selectedProvince.name,
        provinceCode: selectedCode,
        district: '',
        districtCode: undefined
      }
      emit('update:deliveryInfo', updatedInfo)
      
      // Fetch districts for selected province
      fetchDistricts(selectedCode)
    }
  } else {
    const updatedInfo = { 
      ...props.deliveryInfo, 
      province: '',
      provinceCode: undefined,
      district: '',
      districtCode: undefined
    }
    emit('update:deliveryInfo', updatedInfo)
    clearDistricts()
  }
}

// Handle district change
const handleDistrictChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const selectedCode = parseInt(target.value)
  
  if (selectedCode) {
    const selectedDistrict = districts.value.find(d => d.code === selectedCode)
    if (selectedDistrict) {
      const updatedInfo = { 
        ...props.deliveryInfo, 
        district: selectedDistrict.name,
        districtCode: selectedCode
      }
      emit('update:deliveryInfo', updatedInfo)
    }
  } else {
    const updatedInfo = { 
      ...props.deliveryInfo, 
      district: '',
      districtCode: undefined
    }
    emit('update:deliveryInfo', updatedInfo)
  }
}
</script>

<style scoped>
/* Ensure dropdowns open downward */
select {
  /* Force dropdown to appear below the select element */
  position: relative;
  z-index: 1;
}

/* Custom dropdown styling to ensure downward opening */
select option {
  /* Ensure options appear below */
  position: relative;
}

/* Additional styling for better dropdown behavior */
.dropdown-container {
  position: relative;
  z-index: auto;
}

/* Ensure select elements have proper stacking context */
select:focus {
  z-index: 10;
}

/* Override any potential upward dropdown behavior */
select[size] {
  position: static;
}

/* Ensure dropdown list appears below */
select:not([multiple]):not([size]) {
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
}
</style>