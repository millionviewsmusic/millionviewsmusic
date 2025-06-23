"use client";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import {
  youtubeSvg,
  amazonSvg,
  gaanaSvg,
  spotifySvg,
  appleMusicSvg,
} from "../lib/svg";
const AddVideoDialog = dynamic(() => import("../components/AddVideoDialog"), {
  ssr: false,
});

const AddShortDialog = dynamic(() => import("../components/AddShortDialog"), {
  ssr: false,
});

const AddPlaylistDialog = dynamic(
  () => import("../components/AddPlaylistDialog"),
  {
    ssr: false,
  }
);

const EditVideoDialog = dynamic(() => import("../components/EditVideoDialog"), {
  ssr: false,
});

const EditShortDialog = dynamic(() => import("../components/EditShortDialog"), {
  ssr: false,
});

const EditPlaylistDialog = dynamic(
  () => import("../components/EditPlaylistDialog"),
  {
    ssr: false,
  }
);

const UserList = dynamic(() => import("../components/UserList"), {
  ssr: false,
});

import React, { useState, useEffect } from "react";
import Login from "./Login";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Videos states
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loadedIds, setLoadedIds] = useState([]);

  const [showAddVideoDialog, setShowAddVideoDialog] = useState(false);
  const [showAddShortDialog, setShowAddShortDialog] = useState(false);
  const [showAddPlaylistDialog, setShowAddPlaylistDialog] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [editingShort, setEditingShort] = useState(null);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [category, setCategory] = useState("videos");

  const [videoCache, setVideoCache] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        toast.success("Logged in successfully");
      } else {
        throw new Error("Not authorized");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const refetchVideos = async () => {
    if (videoCache[category]) {
      setVideos(videoCache[category]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/${category}`);
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Invalid data format");
      setVideos(data);
      setVideoCache((prev) => ({ ...prev, [category]: data }));
    } catch (err) {
      console.error(`Failed to fetch ${category}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    refetchVideos();
  }, [isLoggedIn, category]);

  const filteredVideos = videos
    .filter((v) => v.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  const handleDeleteVideo = async (id) => {
    try {
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete video");
      }
      refetchVideos();
      toast.success("Video deleted successfully");
    } catch (err) {
      toast.error(err.message || "Failed to delete video");
    }
  };

  const handleDeleteShort = async (id) => {
    try {
      const res = await fetch(`/api/shorts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete short");
      }
      refetchVideos();
      toast.success("Short deleted successfully");
    } catch (err) {
      toast.error(err.message || "Failed to delete short");
    }
  };

  const handleDeletePlaylist = async (id) => {
    try {
      const res = await fetch(`/api/playlists/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete playlist");
      }
      refetchVideos();
      toast.success("Playlist deleted successfully");
    } catch (err) {
      toast.error(err.message || "Failed to delete playlist");
    }
  };

  return !isLoggedIn ? (
    <Login
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  ) : (
    <main className="min-h-screen bg-[#222831] px-6 py-12">
      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl text-center font-bold mb-10 font-sans pt-10 border-b-2 border-[#00ADB5] w-fit mx-auto pb-4">
        Welcome Admin
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="rounded-full px-6 py-3 w-full md:w-96 bg-[#393E46] text-white focus:outline-none placeholder:text-gray-400"
        />

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
          className="rounded-full cursor-pointer px-4 py-3 bg-[#393E46] text-white focus:outline-none"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>

        <button
          onClick={() => setShowAddVideoDialog(true)}
          className="rounded-full cursor-pointer px-5 py-3 bg-[#00ADB5] text-white font-semibold hover:bg-[#019ca3] transition whitespace-nowrap"
        >
          Add Video
        </button>

        <button
          onClick={() => setShowAddShortDialog(true)}
          className="rounded-full cursor-pointer px-5 py-3 bg-[#00ADB5] text-white font-semibold hover:bg-[#019ca3] transition whitespace-nowrap"
        >
          Add Short
        </button>

        <button
          onClick={() => setShowAddPlaylistDialog(true)}
          className="rounded-full cursor-pointer px-5 py-3 bg-[#00ADB5] text-white font-semibold hover:bg-[#019ca3] transition whitespace-nowrap"
        >
          Add Playlist
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {["videos", "shorts", "playlists"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              category === cat
                ? "bg-[#00ADB5] text-white "
                : "bg-[#393E46] text-gray-300 hover:bg-[#4f545c]"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-[#393E46] rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-[0_0_15px_#00ADB5] cursor-pointer"
          >
            <a
              href={
                category === "shorts"
                  ? `https://www.youtube.com/shorts/${video.videoId}`
                  : category === "playlists"
                  ? `https://www.youtube.com/playlist?list=${video.videoId}`
                  : `https://www.youtube.com/watch?v=${video.videoId}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="aspect-video relative">
                <img
                  src={
                    category === "playlists"
                      ? `https://img.youtube.com/vi/${video.firstVideoId}/hqdefault.jpg`
                      : `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
                  }
                  alt={video.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 h-14 text-white opacity-90"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
            <div className="p-4 text-white">
              <h2 className="text-lg font-semibold mb-1">{video.title}</h2>
              <p className="text-sm text-gray-400">
                Published on{" "}
                {new Date(video.createdAt).toLocaleDateString("en-GB")}
              </p>
              <div className="flex gap-x-4 pt-4 items-center">
                {video.youtubeLink && (
                  <a
                    href={video.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F61C0D] hover:text-[#F61C0D]/70 transition-all duration-300 transform hover:scale-120 inline-block "
                  >
                    {youtubeSvg}
                  </a>
                )}
                {video.spotifyLink && (
                  <a
                    href={video.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00DA5A] hover:text-[#00DA5A]/70 transition-all duration-300 transform hover:scale-120 inline-block "
                  >
                    {spotifySvg}
                  </a>
                )}

                {video.amazonLink && (
                  <a
                    href={video.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" transition-all duration-300 transform hover:scale-120 inline-block "
                  >
                    {amazonSvg}
                  </a>
                )}

                {video.appleMusicLink && (
                  <a
                    href={video.appleMusicLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" transition-all duration-300 transform hover:scale-120 inline-block "
                  >
                    {appleMusicSvg}
                  </a>
                )}

                {video.gaanaLink && (
                  <a
                    href={video.gaanaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" transition-all duration-300 transform hover:scale-120 inline-block "
                  >
                    {gaanaSvg}
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (category === "videos") {
                  setEditingVideo(video);
                } else if (category === "shorts") {
                  setEditingShort(video);
                } else if (category === "playlists") {
                  setEditingPlaylist(video);
                }
              }}
              className="my-3 ml-4 cursor-pointer px-4 py-2 bg-[#00ADB5] rounded-full text-white font-semibold hover:bg-[#019ca3] transition"
            >
              Edit{" "}
              {category === "videos"
                ? "Video"
                : category === "shorts"
                ? "Short"
                : "Playlist"}
            </button>

            <button
              onClick={
                category === "videos"
                  ? () => handleDeleteVideo(video.videoId)
                  : category === "shorts"
                  ? () => handleDeleteShort(video.videoId)
                  : () => handleDeletePlaylist(video.videoId)
              }
              className="cursor-pointer ml-4 my-3 px-4 py-2 bg-gray-500 rounded-full text-white font-semibold hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <UserList />
      {showAddVideoDialog && (
        <AddVideoDialog
          onClose={() => setShowAddVideoDialog(false)}
          onSuccess={() => {
            refetchVideos();
            toast.success("Video added successfully");
          }}
        />
      )}

      {showAddShortDialog && (
        <AddShortDialog
          onClose={() => setShowAddShortDialog(false)}
          onSuccess={() => {
            refetchVideos();
            toast.success("Short added successfully");
          }}
        />
      )}

      {showAddPlaylistDialog && (
        <AddPlaylistDialog
          onClose={() => setShowAddPlaylistDialog(false)}
          onSuccess={() => {
            refetchVideos();
            toast.success("Playlist added successfully");
          }}
        />
      )}

      {editingVideo && (
        <EditVideoDialog
          video={editingVideo}
          onClose={() => setEditingVideo(null)}
          onSuccess={() => {
            refetchVideos();
            toast.success("Video updated successfully");
          }}
        />
      )}

      {editingShort && (
        <EditShortDialog
          video={editingShort}
          onClose={() => setEditingShort(null)}
          onSuccess={() => {
            refetchVideos();
            toast.success("Short updated successfully");
          }}
        />
      )}

      {editingPlaylist && (
        <EditPlaylistDialog
          video={editingPlaylist}
          onClose={() => setEditingPlaylist(null)}
          onSuccess={() => {
            refetchVideos();
            toast.success("Playlist updated successfully");
          }}
        />
      )}
    </main>
  );
}
