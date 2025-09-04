"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { authAPI, eventsAPI } from "@/lib/api";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const fetchEvent = async () => {
    try {
      const data = await eventsAPI.getEventById(id);
      if (data?.event) {
        setEvent(data.event);
        setInvitedUsers(data.event.invitedUsers || []);
      } else {
        setError(data.message || "Failed to fetch event details");
      }
    } catch (err) {
      console.error("Error fetching event:", err);
      setError("Something went wrong while fetching event details");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await authAPI.getAllUsers(token);
      if (data?.users) {
        setAllUsers(data.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEvent();
      fetchUsers();
    }
  }, [id]);

  const handleVote = async () => {
    if (!selectedLocation) {
      alert("Please select a location to vote!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await eventsAPI.voteLocation(event._id, selectedLocation, token);
      await fetchEvent();
    } catch (err) {
      console.error("Vote failed:", err);
      setError("Failed to submit vote");
    }
  };

  const handleInvite = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await eventsAPI.inviteUser(event._id, userId, token);
      await fetchEvent();
      alert("User invited successfully!");
    } catch (err) {
      console.error("Invite failed:", err);
      setError("Failed to invite user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col lg:flex-row from-slate-900 via-slate-800 to-black text-white p-6">
      <div className="flex-1 mb-6 lg:mb-0 lg:mr-6">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
          </div>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : event ? (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                {event.title}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {event.description || "No description provided"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                Vote for a Location
              </h3>
              {event.locations?.length > 0 ? (
                <div className="space-y-3">
                  {event.locations.map((loc) => (
                    <label
                      key={loc._id}
                      className="flex items-center gap-2 cursor-pointer text-slate-300"
                    >
                      <input
                        type="radio"
                        name="locationVote"
                        value={loc._id}
                        checked={selectedLocation === loc._id}
                        onChange={() => setSelectedLocation(loc._id)}
                      />
                      <span>
                        {loc.name} —{" "}
                        <span className="font-semibold">{loc.voteCount}</span>{" "}
                        votes
                      </span>
                    </label>
                  ))}
                  <Button
                    onClick={handleVote}
                    className="mt-4 bg-slate-600 hover:bg-slate-500"
                  >
                    Vote
                  </Button>
                </div>
              ) : (
                <p className="text-slate-400">No locations added.</p>
              )}
            </CardContent>
          </Card>
        ) : null}
      </div>

      <div className="flex-1 space-y-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Invite Users
            </CardTitle>
            <CardDescription className="text-slate-400">
              Choose a user to invite
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between"
                >
                  <span className="text-slate-300">
                    {user.name} ({user.email})
                  </span>
                  <Button
                    variant="outline"
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                    onClick={() => handleInvite(user._id)}
                    disabled={invitedUsers.includes(user._id)}
                  >
                    {invitedUsers.includes(user._id) ? "Invited" : "Invite"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDetailsPage;
