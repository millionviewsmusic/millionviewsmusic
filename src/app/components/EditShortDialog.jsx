"use client";

import React, { useState } from "react";

export default function EditVideoDialog({ video, onClose, onSuccess }) {
  const [videoId, setVideoId] = useState(video.videoId);
  const [title, setTitle] = useState(video.title);
  const [createdAt, setCreatedAt] = useState(video.createdAt.slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/shorts/${video.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, title, createdAt }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update video");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-20"
        onClick={onClose}
      >
        <div
          className="z-50 bg-[#393E46] rounded-2xl p-6 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">
            Edit Short
          </h2>

          <div className="flex flex-col gap-4">
            <label className="text-white font-medium">
              Short ID (YouTube)
              <input
                type="text"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-[#222831] text-white border border-[#00ADB5] focus:outline-none"
              />
            </label>

            <label className="text-white font-medium">
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-[#222831] text-white border border-[#00ADB5] focus:outline-none"
              />
            </label>

            <label className="text-white font-medium">
              Created At
              <input
                type="date"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-[#222831] text-white border border-[#00ADB5] focus:outline-none"
              />
            </label>
          </div>

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 cursor-pointer rounded-full bg-gray-600 hover:bg-gray-700 text-white font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2  cursor-pointer rounded-full bg-[#00ADB5] hover:bg-[#019ca3] text-white font-semibold transition"
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
