const BUNGEE_VIDEO_URL = "/Images/Video/BungeeVideo.mp4";

const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/channel/UCJTquxggTSv0qA9tvSedUdA";

const RideExploreData = {
  watermark: "THRILLS",
  tag: "Rafting × Bungee",
  title: "Two Adventures. One Epic Ganga Escape.",
  description:
    "Ride wild rapids on the holy Ganga, then take the leap from the cliffs — River & Rock Adventure blends white-water rafting and bungee thrills into one unforgettable Rishikesh experience.",
  marquee: ["RAFTING", "BUNGEE", "CAMPING", "TRACKING"],
  youtubeUrl: YOUTUBE_CHANNEL_URL,
  featuredVideo: {
    src: BUNGEE_VIDEO_URL,
    maskSrc: "/Images/IllustrationImages/VideoMask.png",
    label: "Bungee Jump",
    alt: "Bungee jumping adventure in Rishikesh",
    playbackRate: 1.5,
  },
  adventures: [
    {
      id: "rafting",
      label: "River Rafting",
      badge: "White Water",
      accent: "red",
      highlights: ["Shivpuri to Ram Jhula", "Certified safety crew", "9 km to 70 km routes"],
    },
    {
      id: "bungee",
      label: "Bungee Jump",
      badge: "Cliff Drop",
      accent: "yellow",
      highlights: ["Trained jump masters", "Premium harness gear", "Valley & river views"],
    },
  ],
};

export default RideExploreData;
