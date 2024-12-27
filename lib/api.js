import axios from 'axios';

// Base URL for the Open Library API
const BASE_URL = 'https://openlibrary.org';

// Get book by isbn 
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/works/${id}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};



// Search Books 
export const searchBooks = async (query, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: { q: query, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for books:', error);
    throw error;
  }
};
