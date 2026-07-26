// lib/config.js - Create this file in your Next.js project

const config = {
  // API base URL - automatically detects environment
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",

  // API endpoints
  endpoints: {
    accommodation: "/api/accommodation",
    rsvp: "/api/rsvp",
    contact: "/api/contact",
    guest: "/api/guest",
    stats: "/api/stats",
  },
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${config.API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default config;
