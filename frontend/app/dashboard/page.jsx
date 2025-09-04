"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar } from "lucide-react";
import { eventsAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const data = await eventsAPI.getMyEvents(token);
        if (data.success) {
          setEvents(data.events || []);
        } else {
          setError(data.message || "Failed to fetch events");
        }
      } catch (err) {
        setError("Something went wrong while fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-8 w-8 text-slate-400" />
        </div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : events.length === 0 ? (
        <div className="text-center text-slate-400">No events created yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event._id}
              onClick={() => router.push(`/events/${event._id}`)}
              className="bg-slate-800/50 border-slate-700 backdrop-blur-sm cursor-pointer hover:bg-slate-700/50 transition rounded-2xl"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  {event.title}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300">
                  Locations: {event.locations?.join(", ") || "N/A"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Button
          onClick={() => router.push("/create-event")}
          className="bg-slate-600 hover:bg-slate-500 text-white h-12 text-lg font-semibold rounded-xl"
        >
          + Create New Event
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
