import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle API requests
const apiRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any) => {
  try {
    const response = await apiClient.request({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Example API calls
export const getBookings = async () => {
  return await apiRequest('get', '/bookings');
};

export const getDashboardData = async () => {
  const response = await apiClient.get('/dashboard/analytics');
  return response.data;
}

export const createBooking = async (bookingData: any) => {
  return await apiRequest('post', '/bookings', bookingData);
};

export const updateBooking = async (bookingId: string, bookingData: any) => {
  return await apiRequest('put', `/bookings/${bookingId}`, bookingData);
};

export const deleteBooking = async (bookingId: string) => {
  return await apiRequest('delete', `/bookings/${bookingId}`);
};