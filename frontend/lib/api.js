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

    getAllUsers: async (token) => {
    const res = await fetch(`${API_BASE}/api/v1/user/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
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
    const res = await fetch(`${API_BASE}/api/v1/event/my-events`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    return res.json();
  },

  getAllEvents: async () => {
    const res = await fetch(`${API_BASE}/api/v1/event`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },

  getEventById: async (id) => {
    const res = await fetch(`${API_BASE}/api/v1/event/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },

  createEvent: async (eventData, token) => {
    const res = await fetch(`${API_BASE}/api/v1/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
      credentials: "include",
    });

    return res.json();
  },

  voteLocation: async (eventId, locationId, token) => {
    const res = await fetch(`${API_BASE}/api/v1/event/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ eventId, locationId }),
    });
    return res.json();
  },

  inviteUser: async (eventId, userId, token) => {
    const res = await fetch(`${API_BASE}/api/v1/event/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId, userId }),
    });
    return res.json();
  },


  acceptInvite: async (eventId, token) => {
    const res = await fetch(`${API_BASE}/api/v1/event/accept-invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId }),
    });
    return res.json();
  },
};

export const notificationsAPI = {
  getNotifications: async (token) => {
    const res = await fetch(`${API_BASE}/api/v1/notifications`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    return res.json();
  },

  markAsRead: async (id, token) => {
    const res = await fetch(`${API_BASE}/api/v1/notifications/${id}/read`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    return res.json();
  },
};

