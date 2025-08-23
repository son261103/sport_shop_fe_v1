import { api } from "../api";
import type {
  Order,
  OrderListParams,
  OrderListResponse,
  OrderResponse,
  OrderStatusUpdateRequest,
  OrderStatistics,
  OrderStatisticsResponse,
  OrderStatisticsParams,
} from "../../types/admin/order";

export const orderService = {
  // Get all orders with pagination and filters
  getOrders: (params?: OrderListParams): Promise<OrderListResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.payment_status) queryParams.append('payment_status', params.payment_status);
    if (params?.payment_method) queryParams.append('payment_method', params.payment_method);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.search) queryParams.append('search', params.search);

    const url = `/admin/orders${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return api.get(url);
  },

  // Get a specific order by ID
  getOrder: (id: number): Promise<OrderResponse> => {
    return api.get(`/admin/orders/${id}`);
  },

  // Update order status
  updateOrderStatus: (
    id: number,
    data: OrderStatusUpdateRequest
  ): Promise<OrderResponse> => {
    return api.put(`/admin/orders/${id}/status`, data);
  },

  // Delete an order
  deleteOrder: (
    id: number
  ): Promise<{ success: boolean; message: string }> => {
    return api.delete(`/admin/orders/${id}`);
  },

  // Get order statistics
  getOrderStatistics: (
    params?: OrderStatisticsParams
  ): Promise<OrderStatisticsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params?.period) queryParams.append('period', params.period);

    const url = `/admin/orders/statistics${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return api.get(url);
  },
};

export default orderService;