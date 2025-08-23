/**
 * Webhook Logger Utility
 * Xử lý logging và error handling cho SePay webhook
 */

import type { SepayWebhookRequest, SepayWebhookResponse } from '../types/payment';

export interface WebhookLogEntry {
  id: string;
  timestamp: string;
  type: 'webhook_received' | 'webhook_processed' | 'webhook_error' | 'payment_updated';
  orderId?: string;
  transactionId?: string;
  gateway?: string;
  amount?: number;
  status?: string;
  data?: any;
  error?: string;
  processingTime?: number;
}

export class WebhookLogger {
  private static logs: WebhookLogEntry[] = [];
  private static maxLogs = 1000; // Giữ tối đa 1000 logs
  
  /**
   * Log webhook được nhận
   */
  static logWebhookReceived(webhookData: SepayWebhookRequest): string {
    const logId = this.generateLogId();
    
    const logEntry: WebhookLogEntry = {
      id: logId,
      timestamp: new Date().toISOString(),
      type: 'webhook_received',
      orderId: this.extractOrderId(webhookData.referenceCode),
      transactionId: webhookData.id.toString(),
      gateway: webhookData.gateway,
      amount: webhookData.transferAmount,
      data: webhookData
    };
    
    this.addLog(logEntry);
    
    console.log(`📥 [${logId}] Webhook nhận được:`, {
      gateway: webhookData.gateway,
      amount: webhookData.transferAmount,
      orderId: logEntry.orderId,
      transactionId: webhookData.id
    });
    
    return logId;
  }
  
  /**
   * Log webhook được xử lý thành công
   */
  static logWebhookProcessed(
    logId: string, 
    response: SepayWebhookResponse, 
    processingTime: number
  ): void {
    const logEntry: WebhookLogEntry = {
      id: this.generateLogId(),
      timestamp: new Date().toISOString(),
      type: 'webhook_processed',
      status: response.success ? 'success' : 'failed',
      data: response,
      processingTime
    };
    
    this.addLog(logEntry);
    
    const emoji = response.success ? '✅' : '❌';
    console.log(`${emoji} [${logId}] Webhook xử lý xong (${processingTime}ms):`, {
      success: response.success,
      message: response.message
    });
  }
  
  /**
   * Log lỗi webhook
   */
  static logWebhookError(logId: string, error: Error, webhookData?: SepayWebhookRequest): void {
    const logEntry: WebhookLogEntry = {
      id: this.generateLogId(),
      timestamp: new Date().toISOString(),
      type: 'webhook_error',
      orderId: webhookData ? this.extractOrderId(webhookData.referenceCode) : undefined,
      transactionId: webhookData?.id.toString(),
      gateway: webhookData?.gateway,
      amount: webhookData?.transferAmount,
      error: error.message,
      data: {
        errorStack: error.stack,
        webhookData
      }
    };
    
    this.addLog(logEntry);
    
    console.error(`❌ [${logId}] Lỗi xử lý webhook:`, {
      error: error.message,
      orderId: logEntry.orderId,
      transactionId: logEntry.transactionId
    });
  }
  
  /**
   * Log cập nhật trạng thái thanh toán
   */
  static logPaymentUpdated(
    orderId: string, 
    oldStatus: string, 
    newStatus: string, 
    transactionId?: string
  ): void {
    const logEntry: WebhookLogEntry = {
      id: this.generateLogId(),
      timestamp: new Date().toISOString(),
      type: 'payment_updated',
      orderId,
      transactionId,
      status: newStatus,
      data: {
        oldStatus,
        newStatus
      }
    };
    
    this.addLog(logEntry);
    
    console.log(`💳 Cập nhật trạng thái thanh toán:`, {
      orderId,
      oldStatus,
      newStatus,
      transactionId
    });
  }
  
  /**
   * Lấy tất cả logs
   */
  static getAllLogs(): WebhookLogEntry[] {
    return [...this.logs].reverse(); // Trả về copy và sắp xếp mới nhất trước
  }
  
  /**
   * Lấy logs theo order ID
   */
  static getLogsByOrderId(orderId: string): WebhookLogEntry[] {
    return this.logs.filter(log => log.orderId === orderId).reverse();
  }
  
  /**
   * Lấy logs theo transaction ID
   */
  static getLogsByTransactionId(transactionId: string): WebhookLogEntry[] {
    return this.logs.filter(log => log.transactionId === transactionId).reverse();
  }
  
  /**
   * Lấy logs theo loại
   */
  static getLogsByType(type: WebhookLogEntry['type']): WebhookLogEntry[] {
    return this.logs.filter(log => log.type === type).reverse();
  }
  
  /**
   * Lấy logs lỗi
   */
  static getErrorLogs(): WebhookLogEntry[] {
    return this.getLogsByType('webhook_error');
  }
  
  /**
   * Xóa logs cũ
   */
  static clearOldLogs(olderThanHours: number = 24): void {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - olderThanHours);
    
    const initialCount = this.logs.length;
    this.logs = this.logs.filter(log => new Date(log.timestamp) > cutoffTime);
    
    const removedCount = initialCount - this.logs.length;
    if (removedCount > 0) {
      console.log(`🧹 Đã xóa ${removedCount} logs cũ (> ${olderThanHours}h)`);
    }
  }
  
  /**
   * Xuất logs ra JSON
   */
  static exportLogs(): string {
    return JSON.stringify({
      exportedAt: new Date().toISOString(),
      totalLogs: this.logs.length,
      logs: this.logs
    }, null, 2);
  }
  
  /**
   * Thống kê logs
   */
  static getLogStats() {
    const stats = {
      total: this.logs.length,
      webhookReceived: 0,
      webhookProcessed: 0,
      webhookErrors: 0,
      paymentUpdated: 0,
      successRate: 0,
      averageProcessingTime: 0
    };
    
    let totalProcessingTime = 0;
    let processedCount = 0;
    
    this.logs.forEach(log => {
      switch (log.type) {
        case 'webhook_received':
          stats.webhookReceived++;
          break;
        case 'webhook_processed':
          stats.webhookProcessed++;
          if (log.processingTime) {
            totalProcessingTime += log.processingTime;
            processedCount++;
          }
          break;
        case 'webhook_error':
          stats.webhookErrors++;
          break;
        case 'payment_updated':
          stats.paymentUpdated++;
          break;
      }
    });
    
    if (stats.webhookReceived > 0) {
      stats.successRate = ((stats.webhookProcessed / stats.webhookReceived) * 100);
    }
    
    if (processedCount > 0) {
      stats.averageProcessingTime = totalProcessingTime / processedCount;
    }
    
    return stats;
  }
  
  /**
   * Private methods
   */
  private static addLog(logEntry: WebhookLogEntry): void {
    this.logs.push(logEntry);
    
    // Giữ số lượng logs trong giới hạn
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }
  
  private static generateLogId(): string {
    return `WH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private static extractOrderId(referenceCode: string): string | undefined {
    const match = referenceCode.match(/ORDER\d+/);
    return match ? match[0] : undefined;
  }
}

export default WebhookLogger;