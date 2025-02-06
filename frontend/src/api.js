import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Buku Routes
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/buku`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_URL}/buku`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    return null;
  }
};

export const updateBook = async (bookData) => {
  try {
    const response = await axios.put(`${API_URL}/buku/${bookData.id}`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    return null;
  }
};

export const deleteBook = async (bookData) => {
  try {
    const response = await axios.delete(`${API_URL}/buku/${bookData.id}`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    return null;
  }
};

// Penulis Routes
export const getPenulis = async () => {
  try {
    const response = await axios.get(`${API_URL}/penulis`);
    return response.data;
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
};

export const addPenulis = async (penulisData) => {
  try {
    const response = await axios.post(`${API_URL}/penulis`, penulisData);
    return response.data;
  } catch (error) {
    console.error("Error adding author:", error);
    return null;
  }
};

// Penerbit Routes
export const getPenerbit = async () => {
  try {
    const response = await axios.get(`${API_URL}/penerbit`);
    return response.data;
  } catch (error) {
    console.error("Error fetching publishers:", error);
    return [];
  }
};

export const addPenerbit = async (penerbitData) => {
  try {
    const response = await axios.post(`${API_URL}/penerbit`, penerbitData);
    return response.data;
  } catch (error) {
    console.error("Error adding publisher:", error);
    return null;
  }
};

// Genre Routes
export const getGenre = async () => {
  try {
    const response = await axios.get(`${API_URL}/genre`);
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const addGenre = async (genreData) => {
  try {
    const response = await axios.post(`${API_URL}/genre`, genreData);
    return response.data;
  } catch (error) {
    console.error("Error adding genre:", error);
    return null;
  }
};

// Pelanggan Routes
export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/pelanggan`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};

// Pesanan Routes
export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/pesanan`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// Pembayaran Routes
export const getPayments = async () => {
  try {
    const response = await axios.get(`${API_URL}/pembayaran`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
};

// Pengiriman Routes
export const getShipments = async () => {
  try {
    const response = await axios.get(`${API_URL}/pengiriman`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipments:", error);
    return [];
  }
};

// Stats Routes (e.g., analytics)
export const getBestSellingBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/best-selling-books`);
    console.log(response);
    return response.data; // Ensure Flask returns a JSON list
  } catch (error) {
    console.error("Error fetching best-selling books:", error);
    return [];
  }
};
