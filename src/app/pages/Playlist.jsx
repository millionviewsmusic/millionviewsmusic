"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";

const VIDEOS_PER_PAGE = 9;

const Playlist = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loadedIds, setLoadedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("videos");

  const youtubeSvg = (
    <svg
      height="35px"
      width="35px"
      viewBox="0 0 461.001 461.001"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path
            style={{ fill: "currentColor" }}
            d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
             c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
             C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123
             c-3.359,1.602-7.239-0.847-7.239-4.568V168.607c0-3.774,3.982-6.22,7.348-4.514
             l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
          />
        </g>
      </g>
    </svg>
  );

  const spotifySvg = (
    <svg
      viewBox="0 0 48 48"
      height="30px"
      width="30px"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(-200, -460)" fill="currentColor">
            <path d="M238.16,481.36 C230.48,476.8 217.64,476.32 210.32,478.6 C209.12,478.96 207.92,478.24 207.56,477.16 C207.2,475.96 207.92,474.76 209,474.4 C217.52,471.88 231.56,472.36 240.44,477.64 C241.52,478.24 241.88,479.68 241.28,480.76 C240.68,481.6 239.24,481.96 238.16,481.36 M237.92,488.08 C237.32,488.92 236.24,489.28 235.4,488.68 C228.92,484.72 219.08,483.52 211.52,485.92 C210.56,486.16 209.48,485.68 209.24,484.72 C209,483.76 209.48,482.68 210.44,482.44 C219.2,479.8 230,481.12 237.44,485.68 C238.16,486.04 238.52,487.24 237.92,488.08 M235.04,494.68 C234.56,495.4 233.72,495.64 233,495.16 C227.36,491.68 220.28,490.96 211.88,492.88 C211.04,493.12 210.32,492.52 210.08,491.8 C209.84,490.96 210.44,490.24 211.16,490 C220.28,487.96 228.2,488.8 234.44,492.64 C235.28,493 235.4,493.96 235.04,494.68 M224,460 C210.8,460 200,470.8 200,484 C200,497.2 210.8,508 224,508 C237.2,508 248,497.2 248,484 C248,470.8 237.32,460 224,460" />
          </g>
        </g>
      </g>
    </svg>
  );

  const amazonSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 48 48"
      id="amazon"
    >
      <g
        id="Icons"
        fill="none"
        fillRule="evenodd"
        stroke="none"
        strokeWidth="1"
      >
        <g id="Color-" transform="translate(-601 -560)">
          <g id="Amazon" transform="translate(601 560)">
            <path
              fill="#000"
              d="M25.403 25.96c-.743 1.482-2.015 2.436-3.393 2.758-.208 0-.527.105-.846.105-2.329 0-3.706-1.802-3.706-4.45 0-3.394 2.012-4.981 4.552-5.726 1.378-.317 2.97-.424 4.558-.424v1.273c0 2.437.105 4.343-1.165 6.464zm1.165-12.608c-1.377.105-2.969.21-4.558.418-2.435.322-4.87.746-6.88 1.7-3.92 1.59-6.57 4.98-6.57 9.959 0 6.257 4.024 9.433 9.113 9.433 1.693 0 3.07-.214 4.337-.528 2.018-.638 3.709-1.804 5.721-3.925 1.166 1.59 1.487 2.335 3.497 4.03.53.209 1.06.209 1.481-.105 1.273-1.062 3.5-2.97 4.663-4.03.53-.423.426-1.06.104-1.586-1.163-1.485-2.331-2.758-2.331-5.619v-9.538c0-4.026.322-7.736-2.645-10.489C30.065.85 26.25 0 23.283 0H22.01C16.612.313 10.894 2.646 9.618 9.323c-.212.85.426 1.166.85 1.27l5.932.743c.635-.107.954-.638 1.058-1.163.528-2.332 2.436-3.498 4.552-3.713h.427c1.272 0 2.65.531 3.389 1.593.847 1.27.742 2.967.742 4.452v.847z"
            ></path>
            <path
              id="Fill-237"
              fill="#FF9A00"
              d="M47.994 35.946v-.002c-.022-.5-.127-.881-.335-1.198l-.023-.03-.025-.032c-.212-.231-.415-.319-.635-.415-.658-.254-1.615-.39-2.766-.392-.827 0-1.739.079-2.656.28l-.003-.063-.923.308-.017.008-.522.17v.022a8.17 8.17 0 0 0-1.684.946c-.322.24-.587.56-.602 1.048a.978.978 0 0 0 .35.75 1.119 1.119 0 0 0 .861.232l.045-.002.034-.006c.452-.096 1.11-.161 1.88-.268.66-.074 1.36-.127 1.967-.127.429-.003.815.028 1.08.084a1.208 1.208 0 0 1 .328.11.955.955 0 0 1 .025.266c.006.508-.208 1.451-.505 2.372-.288.92-.638 1.843-.869 2.456a1.246 1.246 0 0 0-.093.466c-.006.246.096.545.31.743.21.197.48.276.706.276h.011c.339-.003.627-.138.875-.333 2.343-2.106 3.158-5.472 3.192-7.367l-.006-.302zm-6.945 2.92a1.645 1.645 0 0 0-.714.16c-.257.102-.52.221-.768.326l-.364.152-.474.19v.005c-5.15 2.09-10.56 3.315-15.567 3.422-.184.006-.37.006-.548.006-7.874.005-14.297-3.648-20.777-7.248a1.482 1.482 0 0 0-.685-.181c-.291 0-.59.11-.808.313a1.108 1.108 0 0 0-.344.805c-.003.392.209.754.505.988C6.587 43.087 13.253 47.994 22.22 48c.175 0 .353-.006.53-.008 5.704-.128 12.153-2.056 17.16-5.201l.03-.02a17.54 17.54 0 0 0 1.928-1.333c.384-.285.65-.731.65-1.194-.017-.822-.715-1.378-1.468-1.378z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
  const appleMusicSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Apple Music"
      role="img"
      height="30px"
      width="30px"
      viewBox="0 0 512 512"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect width="512" height="512" rx="15%" fill="url(#g)"></rect>
        <linearGradient id="g" x1=".5" y1=".99" x2=".5" y2=".02">
          <stop offset="0" stopColor="#FA233B"></stop>
          <stop offset="1" stopColor="#FB5C74"></stop>
        </linearGradient>
        <path
          fill="#ffffff"
          d="M199 359V199q0-9 10-11l138-28q11-2 12 10v122q0 15-45 20c-57 9-48 105 30 79 30-11 35-40 35-69V88s0-20-17-15l-170 35s-13 2-13 18v203q0 15-45 20c-57 9-48 105 30 79 30-11 35-40 35-69"
        ></path>
      </g>
    </svg>
  );

  const gaanaSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 48 48"
    >
      <path
        fill="#f44336"
        d="M37.228,43H10.772C8.136,43,6,40.864,6,38.228V11.772C6,9.136,8.136,7,10.772,7h26.457	C39.864,7,42,9.136,42,11.772v26.457C42,40.864,39.864,43,37.228,43z"
      ></path>
      <path
        fill="#fff"
        d="M24.962,12c-0.04,0-0.08,0-0.12,0.01c-2.82,0.05-5.11,2.22-5.35,4.99l-1.248,10c0,2.76,2.24,4,5,4	H26.8c0,0.03-0.01,0.06-0.01,0.09C26.47,34.17,26.38,35,23.5,35H18l-1,3h6.5c5.57,0,5.826-3.663,6.28-6.59	C29.84,30.87,32.424,12,32.424,12H24.962z M26.14,28h-2.586c-1.28,0-2.31-1.03-2.31-2.31L22.462,17c0.11-1.28,1.7-1.98,3-2H28	c0.33,0,0.54,0.09,0.67,0.23c0.27,0.27,0.21,0.75,0.15,1.16l-1.14,7.23l-0.55,3.53C27.06,27.64,26.64,28,26.14,28z"
      ></path>
    </svg>
  );

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/${category}`);
        const data = await res.json();
        setVideos(data);
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
      if (sortBy === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "za") return b.title.localeCompare(a.title);
    });

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);

  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  const handleVideoLoad = (id) => {
    setLoadedIds((prev) => [...prev, id]);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
            setCurrentPage(1);
          }}
          className="rounded-full px-6 py-3 w-full md:w-96 bg-[#393E46] text-white focus:outline-none placeholder:text-gray-400"
        />

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
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
        {paginatedVideos.map((video) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-full font-medium transition  ${
              currentPage === 1
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-[#00ADB5] text-white hover:bg-[#019ca3] cursor-pointer"
            }`}
          >
            Previous
          </button>
          <span className="text-white text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-full font-medium transition  ${
              currentPage === totalPages
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-[#00ADB5] text-white hover:bg-[#019ca3] cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </Element>
  );
};

export default Playlist;
