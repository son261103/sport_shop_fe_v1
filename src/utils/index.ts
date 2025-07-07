// 🛠️ Utils Export

export { getCategoryClass, getButtonClass, getBadgeClass } from './ui'

// 💰 Price Formatting Utility
export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(numPrice);
};
