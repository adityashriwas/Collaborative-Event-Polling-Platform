"use client";
import React, { useEffect, useState } from "react";
import { notificationsAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "../Custom Components/ProtectedRoute";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    const data = await notificationsAPI.getNotifications(token);
    if (data.success) setNotifications(data.notifications);
  };

  const markRead = async (id) => {
    const token = localStorage.getItem("token");
    await notificationsAPI.markAsRead(id, token);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ProtectedRoute>
    <div className="bg-slate-800 p-4 shadow-md min-h-screen">
      <h2 className="text-xl font-bold text-white mb-3">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-slate-400">No notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`p-2 rounded-md ${
                n.isRead ? "bg-slate-700" : "bg-slate-600"
              } flex justify-between`}
            >
              <span>{n.message}</span>
              {!n.isRead && (
                <Button
                  size="sm"
                  onClick={() => markRead(n._id)}
                  className="ml-2 bg-slate-500 hover:bg-slate-400"
                >
                  Mark Read
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </ProtectedRoute>
  );
};

export default Notifications;
