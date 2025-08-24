import { api } from './api';

export interface ChatMessage {
  message: string;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  products?: any[]; 
}

export const sendMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await api.post<ChatResponse>('/chat', { message });
    return response;
  } catch (error) {
    console.error('Error sending message to chat API:', error);
    throw error;
  }
};

