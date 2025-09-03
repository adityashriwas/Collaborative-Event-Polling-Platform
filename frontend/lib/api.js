const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

// Auth APIs
export const authAPI = {
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/api/v1/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include", 
    });
    return handleResponse(res);
  },

  signup: async (userData) => {
    const res = await fetch(`${API_BASE}/api/v1/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    return handleResponse(res);
  },

  getCurrentUser: async () => {
  const res = await fetch(`${API_BASE}/api/v1/user/profile`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include", 
  });

  if (!res.ok) return null;

  return res.json();
},


  logout: async () => {
    const res = await fetch(`${API_BASE}/api/v1/user/logout`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse(res);
  },
};


// Events APIs
export const eventsAPI = {
  getMyEvents: async (token) => {
    const res = await fetch(`${API_BASE}/api/events/my`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  
  createEvent: async (eventData, token) => {
    const res = await fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(eventData)
    });
    return res.json();
  }
};