import { Event } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "Event title and description are required.",
      });
    }

    const event = await Event.create({
      title,
      description,
      creator: req.id,
    });

    return res.status(201).json({
      event,
      message: "Event created.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create event",
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
}

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

