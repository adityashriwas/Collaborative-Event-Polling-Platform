import { Notification } from "../models/notification.model.js";

export const createNotification = async (userId, message, eventId) => {
  return await Notification.create({ userId, message, eventId });
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.id }).sort({
      createdAt: -1,
    });

    res.json({ 
      success: true, 
      notifications 
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch notifications" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update notification" });
  }
};
