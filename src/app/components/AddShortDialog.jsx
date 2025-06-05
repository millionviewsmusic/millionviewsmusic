"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddShortDialog({ onClose, onSuccess }) {
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVideo = {
      videoId,
      title,
      createdAt: createdAt
        ? new Date(createdAt + "T00:00:00Z").toISOString()
        : new Date().toISOString(),
      clicks: 0,
    };

    try {
      const res = await fetch("/api/shorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVideo),
      });

      if (!res.ok) throw new Error("Failed to add short");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add short");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#393e46] rounded-xl w-full max-w-md p-6 border border-white">
        <h2 className="text-white text-xl font-semibold mb-4 text-center">
          Add New Short
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="YouTube Short ID"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            required
            className="p-3 rounded border border-white bg-[#222831] text-white placeholder-[#88a1a6] focus:outline-none"
          />
          <input
            type="text"
            style={{ colorScheme: "dark" }}
            placeholder="Short Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-3 rounded border border-white bg-[#222831] text-white placeholder-[#88a1a6] focus:outline-none"
          />
          <input
            type="date"
            style={{ colorScheme: "dark" }}
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
            className="p-3 rounded border border-white bg-[#222831] text-white placeholder-[#88a1a6] focus:outline-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
          />

          <div className="flex justify-between gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer py-3 bg-gray-600 rounded text-white font-semibold hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-3 cursor-pointer bg-[#00ADB5] rounded text-white font-semibold hover:bg-[#019ca3] transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
