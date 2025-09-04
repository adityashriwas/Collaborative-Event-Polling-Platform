import { Event } from "../models/event.model.js";
import { createNotification } from "./notification.controller.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, locations } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Event title and description are required.",
      });
    }

    let formattedLocations = Array.isArray(locations)
      ? locations.map((loc) => ({
          name: loc.name || loc,
          voteCount: 0,
          votedBy: [],
        }))
      : [];

    const event = await Event.create({
      title,
      description,
      createdBy: req.id,
      locations: formattedLocations,
    });

    return res.status(201).json({
      event,
      message: "Event created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create event",
    });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      event,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to retrieve event",
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json({
      events,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to retrieve events",
    });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.id;

    const events = await Event.find({ createdBy: userId });
    return res.status(200).json({
      events,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to retrieve events",
    });
  }
};

export const editEvent = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return res.status(400).json({
        message: "Event title and description are required.",
      });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      event,
      message: "Event updated.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update event",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      message: "Event deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete event",
    });
  }
};

export const voteLocation = async (req, res) => {
  try {
    const { eventId, locationId } = req.body;
    const userId = req.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const location = event.locations.id(locationId);
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    if (location.votedBy.includes(userId)) {
      return res.status(400).json({ message: "Already voted for this option" });
    }

    location.voteCount += 1;
    location.votedBy.push(userId);

    await event.save();

    res.status(200).json({ event, message: "Vote recorded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to record vote" });
  }
};

export const inviteUser = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.participants.includes(userId)) {
      event.participants.push(userId);
      await event.save();
    }

    await createNotification(
      userId,
      `You have been invited to event: ${event.title}`,
      eventId
    );

    res.json({ success: true, message: "User invited & notification created" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to invite user" });
  }
};

export const acceptInvite = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.id; 

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.invitedUsers.includes(userId)) {
      return res.status(400).json({ message: "User not invited" });
    }

    event.invitedUsers.pull(userId);
    event.participants.push(userId);

    await event.save();

    return res.status(200).json({ event, message: "Invite accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to accept invite" });
  }
};
