import axios from 'axios';

// Base URL for the Open Library API
const BASE_URL = 'https://openlibrary.org';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get book by id 
export const getBookDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/works/${id}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

// Get author by id 
export const getAuthorDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/authors/${id}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching author details:', error);
    throw error;
  }
};

// Search Books 
export const searchBooks = async (params) => {
  try {
    const response = await axiosInstance.get(`/search.json`, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching for books:', error);
    throw error;
  }
};
