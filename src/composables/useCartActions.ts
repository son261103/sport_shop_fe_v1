import type { Ref } from 'vue';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  brand: string;
  image: string;
  price: number;
  category: string;
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

interface SuccessMessage {
  title: string;
  content: string;
}

export function useCartActions(
  cartItems: Ref<CartItem[]>,
  selectedItems: Ref<string[]>,
  deliveryInfo: Ref<DeliveryInfo>,
  currentStep: Ref<number>,
  selectedPayment: Ref<string>,
  voucherCode: Ref<string>,
  appliedDiscount: Ref<number>,
  shippingFee: Ref<number>,
  showSuccessModal: Ref<boolean>,
  successMessage: Ref<SuccessMessage>
) {
  
  // Format price function
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Toggle select all items
  const toggleSelectAll = () => {
    if (selectedItems.value.length === cartItems.value.length) {
      selectedItems.value = [];
    } else {
      selectedItems.value = cartItems.value.map(item => item.id);
    }
  };

  // Update item quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    const item = cartItems.value.find(item => item.id === itemId);
    if (item && newQuantity > 0 && newQuantity <= (item.stock || 0)) {
      item.quantity = newQuantity;
      
      // Recalculate shipping fee based on total quantity
      const totalQuantity = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
      shippingFee.value = totalQuantity > 5 ? 0 : 30000;
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    const itemIndex = cartItems.value.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      cartItems.value.splice(itemIndex, 1);
      selectedItems.value = selectedItems.value.filter(id => id !== itemId);
      showSuccessMessage('Xóa thành công', 'Sản phẩm đã được xóa khỏi giỏ hàng');
    }
  };

  // Clear entire cart
  const clearCart = () => {
    cartItems.value = [];
    selectedItems.value = [];
    appliedDiscount.value = 0;
    showSuccessMessage('Xóa thành công', 'Tất cả sản phẩm đã được xóa khỏi giỏ hàng');
  };

  // Apply voucher
  const applyVoucher = () => {
    // Mock voucher logic
    const vouchers: Record<string, number> = {
      'SPORT10': 10,
      'SPORT20': 20,
      'NEWUSER': 15,
      'SUMMER2024': 25
    };
    
    const discount = vouchers[voucherCode.value.toUpperCase()];
    if (discount) {
      appliedDiscount.value = discount;
      showSuccessMessage('Áp dụng thành công', `Mã giảm giá ${discount}% đã được áp dụng`);
    } else {
      showSuccessMessage('Mã không hợp lệ', 'Vui lòng kiểm tra lại mã giảm giá');
    }
  };

  // Validate delivery information
  const validateDeliveryInfo = (): boolean => {
    const { fullName, phone, province, district, address } = deliveryInfo.value;
    
    if (!fullName.trim()) {
      return false;
    }
    
    if (!phone.trim()) {
      return false;
    }
    
    // Basic phone validation
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return false;
    }
    
    if (!province) {
      return false;
    }
    
    if (!district) {
      return false;
    }
    
    if (!address.trim()) {
      return false;
    }
    
    return true;
  };

  // Proceed to next step
  const proceedToNextStep = () => {
    // Validate delivery information when moving from step 2 to step 3
    if (currentStep.value === 2) {
      if (!validateDeliveryInfo()) {
        return; // Stop progression if validation fails
      }
    }
    
    // Validate selected items when moving from step 1 to step 2
    if (currentStep.value === 1) {
      const selectedCartItems = cartItems.value.filter(item => selectedItems.value.includes(item.id));
      if (selectedCartItems.length === 0) {
        showSuccessMessage('Chưa chọn sản phẩm', 'Vui lòng chọn ít nhất một sản phẩm để tiếp tục');
        return;
      }
    }
    
    // Validate payment method when moving from step 3 to step 4
    if (currentStep.value === 3) {
      if (!selectedPayment.value) {
        showSuccessMessage('Chưa chọn phương thức thanh toán', 'Vui lòng chọn phương thức thanh toán');
        return;
      }
    }
    
    if (currentStep.value < 4) {
      currentStep.value++;
    }
    
    if (currentStep.value === 4) {
      // Clear cart after successful order
      setTimeout(() => {
        cartItems.value = [];
        selectedItems.value = [];
        appliedDiscount.value = 0;
      }, 2000);
    }
  };

  // Go back to previous step
  const goToPreviousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };

  // Handle province change
  const onProvinceChange = () => {
    deliveryInfo.value.district = '';
  };

  // Show success message
  const showSuccessMessage = (title: string, content: string) => {
    successMessage.value = { title, content };
    showSuccessModal.value = true;
    
    // Auto close after 3 seconds
    setTimeout(() => {
      showSuccessModal.value = false;
    }, 3000);
  };

  return {
    formatPrice,
    toggleSelectAll,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyVoucher,
    validateDeliveryInfo,
    proceedToNextStep,
    goToPreviousStep,
    onProvinceChange,
    showSuccessMessage
  };
}