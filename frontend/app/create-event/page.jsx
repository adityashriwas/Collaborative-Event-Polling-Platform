"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { eventsAPI } from "@/lib/api";
import ProtectedRoute from "../Custom Components/ProtectedRoute";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    locations: [""],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (index, value) => {
    const newLocations = [...formData.locations];
    newLocations[index] = value;
    setFormData((prev) => ({ ...prev, locations: newLocations }));
  };

  const addLocation = () => {
    setFormData((prev) => ({ ...prev, locations: [...prev.locations, ""] }));
  };

  const removeLocation = (index) => {
    const newLocations = formData.locations.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, locations: newLocations }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const payload = {
        title: formData.title,
        description: formData.description,
        locations: formData.locations
          .filter((loc) => loc.trim() !== "")
          .map((loc) => ({ name: loc })),
      };

      await eventsAPI.createEvent(payload, token);

      setFormData({ title: "", description: "", locations: [""] });
    } catch (err) {
      console.error(err);
      setError("Failed to create event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Create Event</h1>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Create Your Event
          </CardTitle>
          <CardDescription className="text-slate-400">
            Fill in the details below to create your event
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert className="bg-red-950/50 border-red-800 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter event description"
                required
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Locations</Label>
              {formData.locations.map((location, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) =>
                      handleLocationChange(index, e.target.value)
                    }
                    placeholder={`Location ${index + 1}`}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-slate-400"
                  />
                  {formData.locations.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeLocation(index)}
                      className="bg-red-600 hover:bg-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={addLocation}
                className="mt-2 bg-slate-600 hover:bg-slate-500"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Location
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-600 hover:bg-slate-500 text-white border-0 h-12 text-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Event"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </ProtectedRoute>
  );
};

export default Page;
