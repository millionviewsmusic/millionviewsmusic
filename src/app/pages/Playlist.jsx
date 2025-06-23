"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";
import {
  youtubeSvg,
  amazonSvg,
  gaanaSvg,
  spotifySvg,
  appleMusicSvg,
} from "../lib/svg";

const VIDEOS_PER_PAGE = 9;

const Playlist = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loadedIds, setLoadedIds] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("videos");
  const [videoCache, setVideoCache] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      if (videoCache[category]) {
        setVideos(videoCache[category]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/${category}`);
        const data = await res.json();
        setVideos(data);
        setVideoCache((prev) => ({ ...prev, [category]: data }));
      } catch (err) {
        console.error(`Failed to fetch ${category}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [category]);

  const filteredVideos = videos
    .filter((v) => v.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "az") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "za") {
        return b.title.localeCompare(a.title);
      }
    });

  const handleVideoLoad = (id) => {
    setLoadedIds((prev) => [...prev, id]);
  };

  return (
    <Element name="PLAYLIST" className="min-h-screen bg-[#222831] px-6 py-12">
      <motion.h1
        className="text-white text-4xl sm:text-5xl md:text-6xl text-center font-bold mb-10 font-sans pt-10 border-b-2 border-[#00ADB5] w-fit mx-auto pb-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0, y: -40 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        Our Music
      </motion.h1>

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
          </div>
        ))}
      </div>
    </Element>
  );
};

export default Playlist;
