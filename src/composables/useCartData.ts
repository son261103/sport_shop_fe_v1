import { ref, computed } from 'vue';
import type { SportCategory } from '@/types';

// Types
interface CartItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  brand: string;
  image: string;
  price: number;
  category: SportCategory;
  inStock: boolean;
  rating: number;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  stock?: number;
  discount?: number;
  addedAt?: string;
}

interface DeliveryInfo {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  address: string;
  provinceCode?: number;
  districtCode?: number;
}

interface Province {
  value: string;
  label: string;
}

interface District {
  value: string;
  label: string;
}

export function useCartData() {
  // State
  const isLoading = ref(true);
  const currentStep = ref(1);
  const cartItems = ref<CartItem[]>([]);
  const selectedItems = ref<string[]>([]);
  const voucherCode = ref('');
  const appliedDiscount = ref(0);
  const shippingFee = ref(30000);
  const sortBy = ref('default');
  const selectedPayment = ref('cod');
  
  const deliveryInfo = ref<DeliveryInfo>({
    fullName: '',
    phone: '',
    province: '',
    district: '',
    address: '',
    provinceCode: undefined,
    districtCode: undefined
  });

  // Provinces data
  const provinces: Province[] = [
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'hcm', label: 'TP. Hồ Chí Minh' },
    { value: 'danang', label: 'Đà Nẵng' },
    { value: 'haiphong', label: 'Hải Phòng' },
    { value: 'cantho', label: 'Cần Thơ' },
    { value: 'other', label: 'Tỉnh/thành khác' }
  ];

  // Districts data
  const districtsData: Record<string, District[]> = {
    hanoi: [
      { value: 'hoankiem', label: 'Hoàn Kiếm' },
      { value: 'dongda', label: 'Đống Đa' },
      { value: 'badinh', label: 'Ba Đình' },
      { value: 'cagiay', label: 'Cầu Giấy' },
      { value: 'thanxuan', label: 'Thanh Xuân' }
    ],
    hcm: [
      { value: 'quan1', label: 'Quận 1' },
      { value: 'quan3', label: 'Quận 3' },
      { value: 'quan7', label: 'Quận 7' },
      { value: 'thuduc', label: 'Thủ Đức' },
      { value: 'binhtan', label: 'Bình Tân' }
    ],
    danang: [
      { value: 'haichau', label: 'Hải Châu' },
      { value: 'thankhê', label: 'Thanh Khê' },
      { value: 'sontra', label: 'Sơn Trà' },
      { value: 'nguhanhson', label: 'Ngũ Hành Sơn' }
    ],
    haiphong: [
      { value: 'hongan', label: 'Hồng Bàng' },
      { value: 'ngo quyen', label: 'Ngô Quyền' },
      { value: 'le chan', label: 'Lê Chân' }
    ],
    cantho: [
      { value: 'ninhkieu', label: 'Ninh Kiều' },
      { value: 'cairang', label: 'Cái Răng' },
      { value: 'binhthuy', label: 'Bình Thủy' }
    ],
    other: [
      { value: 'other', label: 'Khác' }
    ]
  };

  // Modal state
  const showSuccessModal = ref(false);
  const successMessage = ref({
    title: '',
    content: ''
  });

  // Computed
  const allSelected = computed(() => {
    return cartItems.value.length > 0 && selectedItems.value.length === cartItems.value.length;
  });

  const selectedCartItems = computed(() => {
    return cartItems.value.filter(item => selectedItems.value.includes(item.id));
  });

  const subtotal = computed(() => {
    return selectedCartItems.value.reduce((sum, item) => {
      const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
      return sum + (price * item.quantity);
    }, 0);
  });

  const total = computed(() => {
    return subtotal.value + shippingFee.value - appliedDiscount.value;
  });

  const sortedCartItems = computed(() => {
    const items = [...cartItems.value];
    
    switch (sortBy.value) {
      case 'name':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-low':
        return items.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
      case 'price-high':
        return items.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
      case 'newest':
        return items.sort((a, b) => new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime());
      default:
        return items;
    }
  });

  const availableDistricts = computed(() => {
    return districtsData[deliveryInfo.value.province] || [];
  });

  // Mock data loader
  const loadMockData = () => {
    cartItems.value = [
      {
        id: '1',
        productId: 'prod-1',
        name: 'Nike Air Max 270 React',
        description: 'Giày thể thao Nike Air Max 270 React',
        brand: 'Nike',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        price: 3200000,
        category: 'running' as SportCategory,
        inStock: true,
        rating: 4.5,
        selectedColor: 'Đen/Trắng',
        selectedSize: '42',
        quantity: 1,
        stock: 15,
        discount: 20,
        addedAt: new Date().toISOString()
      },
      {
        id: '2',
        productId: 'prod-2',
        name: 'Adidas Ultraboost 22',
        description: 'Giày chạy bộ Adidas Ultraboost 22',
        brand: 'Adidas',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
        price: 4500000,
        category: 'running' as SportCategory,
        inStock: true,
        rating: 4.8,
        selectedColor: 'Xanh Navy',
        selectedSize: '41',
        quantity: 2,
        stock: 8,
        addedAt: new Date().toISOString()
      }
    ];
    
    // Select all items by default
    selectedItems.value = cartItems.value.map(item => item.id);
    
    // Calculate initial shipping fee
    const totalQuantity = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
    shippingFee.value = totalQuantity > 5 ? 0 : 30000;
  };

  return {
    // State
    isLoading,
    currentStep,
    cartItems,
    selectedItems,
    voucherCode,
    appliedDiscount,
    shippingFee,
    sortBy,
    selectedPayment,
    deliveryInfo,
    showSuccessModal,
    successMessage,
    
    // Data
    provinces,
    districtsData,
    
    // Computed
    allSelected,
    selectedCartItems,
    subtotal,
    total,
    sortedCartItems,
    availableDistricts,
    
    // Methods
    loadMockData
  };
}