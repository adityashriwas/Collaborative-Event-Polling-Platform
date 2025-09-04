"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { eventsAPI } from "@/lib/api";

const EventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsAPI.getAllEvents();
        if (data?.events) {
          setEvents(data.events);
        } else {
          setError("Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Something went wrong while fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">All Events</h1>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
        </div>
      ) : error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-slate-400 text-center">No events available</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event._id}
              className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-slate-500 transition cursor-pointer"
              onClick={() => router.push(`/events/${event._id}`)}
            >
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {event.description?.length > 80
                    ? event.description.slice(0, 80) + "..."
                    : event.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    router.push(`/events/${event._id}`);
                  }}
                  className="w-full bg-slate-600 hover:bg-slate-500"
                >
                  View Event
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
