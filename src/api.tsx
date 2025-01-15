const API_URL = "http://localhost:5001/api";

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const addProject = async (token, projectData) => {
  const response = await fetch(`${API_URL}/project/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};
