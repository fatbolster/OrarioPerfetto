const API_URL = "http://localhost:5001/api";

export const fetchWithAuth = async (url: string, options = {}) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No token found in localStorage");
    throw new Error("User is not authenticated");
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${API_URL}${url}`, {
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
