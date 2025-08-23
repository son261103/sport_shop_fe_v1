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
            :class="[
              'w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:border-transparent',
              validationErrors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport'
            ]"
            placeholder="Nhập họ và tên"
          >
          <div v-if="validationErrors.fullName" class="text-red-500 text-sm mt-1">
            {{ validationErrors.fullName }}
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Số điện thoại <span class="text-red-500">*</span>
          </label>
          <input 
            type="tel" 
            :value="deliveryInfo.phone"
            @input="updateField('phone', ($event.target as HTMLInputElement).value)"
            :class="[
              'w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:border-transparent',
              validationErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport'
            ]"
            placeholder="Nhập số điện thoại"
          >
          <div v-if="validationErrors.phone" class="text-red-500 text-sm mt-1">
            {{ validationErrors.phone }}
          </div>
        </div>
        
        <div class="relative">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Tỉnh/Thành phố <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input 
              type="text"
              :value="provinceSearchText"
              @input="handleProvinceSearch"
              @focus="showProvinceDropdown = true"
              @blur="hideProvinceDropdown"
              :disabled="loading"
              :class="[
                'w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-10',
                validationErrors.province ? 'border-red-500 focus:ring-red-500' : 'border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport'
              ]"
              :placeholder="loading ? 'Đang tải...' : 'Tìm kiếm tỉnh/thành phố'"
              autocomplete="off"
            >
            <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary pointer-events-none"></i>
            
            <!-- Province Dropdown -->
            <div v-if="showProvinceDropdown && filteredProvinces.length > 0" 
                 class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-light-border-primary dark:border-dark-border-primary rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div v-for="province in filteredProvinces" 
                   :key="province.code"
                   @mousedown="selectProvince(province)"
                   class="px-4 py-3 hover:bg-light-surface-primary dark:hover:bg-dark-surface-primary cursor-pointer text-light-text-primary dark:text-dark-text-primary transition-colors duration-200">
                {{ province.name }}
              </div>
            </div>
          </div>
          <div v-if="validationErrors.province || error" class="text-red-500 text-sm mt-1">
            {{ validationErrors.province || error }}
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Quận/Huyện <span class="text-red-500">*</span>
          </label>
          <select 
            :value="deliveryInfo.districtCode || ''"
            @change="handleDistrictChange"
            :disabled="!deliveryInfo.provinceCode || loading"
            :class="[
              'w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
              validationErrors.district ? 'border-red-500 focus:ring-red-500' : 'border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport'
            ]"
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
          <div v-if="validationErrors.district" class="text-red-500 text-sm mt-1">
            {{ validationErrors.district }}
          </div>
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Địa chỉ chi tiết <span class="text-red-500">*</span>
          </label>
          <textarea 
            :value="deliveryInfo.address"
            @input="updateField('address', ($event.target as HTMLTextAreaElement).value)"
            rows="3"
            :class="[
              'w-full px-4 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:border-transparent resize-none',
              validationErrors.address ? 'border-red-500 focus:ring-red-500' : 'border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport'
            ]"
            placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường...)"
          ></textarea>
          <div v-if="validationErrors.address" class="text-red-500 text-sm mt-1">
            {{ validationErrors.address }}
          </div>
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
          @click="handleProceedToNextStep"
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
import { onMounted, watch, ref, computed } from 'vue'
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

// Validation errors
const validationErrors = ref<Record<string, string>>({});

// Province search functionality
const provinceSearchText = ref('');
const showProvinceDropdown = ref(false);

// District search functionality
const districtSearchText = ref('');

// Computed for filtered provinces
const filteredProvinces = computed(() => {
  if (!provinceSearchText.value.trim()) {
    return provincesForSelect.value;
  }
  return provincesForSelect.value.filter(province => 
    province.name.toLowerCase().includes(provinceSearchText.value.toLowerCase())
  );
});

// Use provinces composable
const {
  districts,
  loading,
  error,
  provincesForSelect,
  districtsForSelect,
  fetchProvinces,
  fetchDistricts,
} = useProvinces()

// Load provinces on component mount
onMounted(() => {
  fetchProvinces()
})

// Validation functions
const validateFullName = (value: string): string => {
  if (!value.trim()) return 'Vui lòng nhập họ và tên';
  if (value.trim().length < 2) return 'Họ và tên phải có ít nhất 2 ký tự';
  if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value.trim())) return 'Họ và tên chỉ được chứa chữ cái và khoảng trắng';
  return '';
};

const validatePhone = (value: string): string => {
  if (!value.trim()) return 'Vui lòng nhập số điện thoại';
  const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/;
  if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Số điện thoại không hợp lệ';
  return '';
};

const validateProvince = (value: string): string => {
  if (!value.trim()) return 'Vui lòng chọn tỉnh/thành phố';
  return '';
};

const validateDistrict = (value: string): string => {
  if (!value.trim()) return 'Vui lòng chọn quận/huyện';
  return '';
};

const validateAddress = (value: string): string => {
  if (!value.trim()) return 'Vui lòng nhập địa chỉ chi tiết';
  if (value.trim().length < 5) return 'Địa chỉ phải có ít nhất 5 ký tự';
  return '';
};

const validateField = (field: keyof DeliveryInfo, value: string) => {
  let error = '';
  switch (field) {
    case 'fullName':
      error = validateFullName(value);
      break;
    case 'phone':
      error = validatePhone(value);
      break;
    case 'province':
      error = validateProvince(value);
      break;
    case 'district':
      error = validateDistrict(value);
      break;
    case 'address':
      error = validateAddress(value);
      break;
  }
  
  if (error) {
    validationErrors.value[field] = error;
  } else {
    delete validationErrors.value[field];
  }
  
  return error === '';
};

const validateAllFields = (): boolean => {
  const fields: (keyof DeliveryInfo)[] = ['fullName', 'phone', 'province', 'district', 'address'];
  let isValid = true;
  
  fields.forEach(field => {
    const value = props.deliveryInfo[field] as string;
    if (!validateField(field, value)) {
      isValid = false;
    }
  });
  
  return isValid;
};

const updateField = (field: keyof DeliveryInfo, value: string) => {
  const updatedInfo = { ...props.deliveryInfo, [field]: value };
  emit('update:deliveryInfo', updatedInfo);
  
  // Validate field on change
  validateField(field, value);
};

// Handle proceed to next step with validation
const handleProceedToNextStep = () => {
  if (validateAllFields()) {
    emit('proceedToNextStep');
  }
};

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

// Handle province search input
const handleProvinceSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  provinceSearchText.value = target.value;
  showProvinceDropdown.value = true;
};

// Select province from dropdown
const selectProvince = (province: { code: number; name: string }) => {
  provinceSearchText.value = province.name;
  showProvinceDropdown.value = false;
  
  const updatedInfo = { 
    ...props.deliveryInfo, 
    province: province.name,
    provinceCode: province.code,
    district: '',
    districtCode: undefined
  };
  emit('update:deliveryInfo', updatedInfo);
  
  // Fetch districts for selected province
  fetchDistricts(province.code);
  
  // Validate province field
  validateField('province', province.name);
};

// Hide province dropdown with delay
const hideProvinceDropdown = () => {
  setTimeout(() => {
    showProvinceDropdown.value = false;
  }, 200);
};

// Watch for changes in delivery info to update search text
watch(() => props.deliveryInfo.province, (newProvince) => {
  if (newProvince && newProvince !== provinceSearchText.value) {
    provinceSearchText.value = newProvince;
  }
});

// Watch for changes in district to update search text
watch(() => props.deliveryInfo.district, (newDistrict) => {
  if (newDistrict && newDistrict !== districtSearchText.value) {
    districtSearchText.value = newDistrict;
  }
});
</script>