const API_URL = "http://localhost:5001/api";

export const fetchWithAuth = async (url: string, options = {}) => {
  const token = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...(options.headers || {}) },
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};