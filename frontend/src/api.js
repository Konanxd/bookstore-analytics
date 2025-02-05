import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
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

export const getBestSellingBooks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/analytics/best-selling-books");
    console.log(response);
    return response.data; // Ensure Flask returns a JSON list
  } catch (error) {
    console.error("Error fetching best-selling books:", error);
    return [];
  }
};
