// SePay webhook types
export interface SepayWebhookRequest {
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  content: string;
  transferType: 'in' | 'out';
  transferAmount: number;
  referenceCode: string;
  id: number;
}

export interface SepayWebhookResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface PaymentStatus {
  orderId: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  amount: number;
  transactionId?: string;
  gateway?: string;
  updatedAt: string;
}

export interface OrderPaymentUpdate {
  orderId: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionId: string;
  gateway: string;
  amount: number;
  transactionDate: string;
}

// QR Code generation types
export interface SepayQRRequest {
  order_id: number;
}

export interface SepayQRData {
  qr_code: string;
  account_number: string;
  account_holder_name: string;
  bank_name: string;
  bank_code: string;
  amount: number;
  content: string;
  reference_code: string;
}

export interface SepayQRResponse {
  success: boolean;
  message: string;
  data: SepayQRData;
}

// Error response types
export interface SepayErrorResponse {
  success: false;
  message: string;
}

// Bank info interfaces
export interface BankInfoData {
  account_number: string;
  account_holder_name: string;
  bank_name: string;
  bank_code: string;
  bank_short_name: string;
}

export interface BankInfoResponse {
  success: true;
  message: string;
  data: BankInfoData;
}
