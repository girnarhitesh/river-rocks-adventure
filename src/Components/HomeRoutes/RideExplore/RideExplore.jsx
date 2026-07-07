import React from "react";
import { motion } from "framer-motion";
import BrushFrame from "../../CommonComponents/BrushFrame";
import { BRUSH_FRAME_DEFAULTS } from "../../CommonComponents/BrushFrame/brushFrameDefaults";
import "./RideExplore.css";

const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/channel/UCJTquxggTSv0qA9tvSedUdA";

const EXPLORE_VIDEO_URL = "/Images/Video/River&RocksRaftingVideo.mp4";

const openYouTubeChannel = () => {
  window.open(YOUTUBE_CHANNEL_URL, "_blank", "noopener,noreferrer");
};

const RideExplore = () => {
  return (
    <section id="ride-explore">
      <div className="MaxWidthContainer MarginAuto SectionTopBottom ride-explore-wrap">
        <span className="ride-explore-watermark" aria-hidden="true">
          EXPLORE
        </span>

        <div className="ride-explore-grid">
          <motion.div
            className="ride-explore-copy"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="ride-explore-accent" aria-hidden="true" />

            <h2 className="ride-explore-title section-heading-accent">
              <span>Discover India with River & Rock Adventure</span>
              {/* <span className="ride-explore-title-light">inaccessible</span>
              <span>PLACES</span> */}
            </h2>

            <p>
            River & Rock Adventure helps you explore the beauty of India through carefully curated tours and unforgettable travel experiences. From thrilling adventures to rich cultural journeys, we make travel simple, enjoyable, and memorable. Our experienced team is here to guide you with expert advice, personalized itineraries, and reliable travel services every step of the way.
            </p>
          </motion.div>

          <motion.div
            className="ride-explore-visual"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <motion.div
              className="ride-brush-stage"
              animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <BrushFrame
                src={EXPLORE_VIDEO_URL}
                mediaType="video"
                alt="River and Rocks rafting adventure"
                maskSrc={BRUSH_FRAME_DEFAULTS.brushMaskSrc}
                overlaySrc={null}
                aspectRatio="5 / 3.1"
                maxWidth="560px"
                maskSize="contain"
                objectPosition="center 42%"
                animateMedia
                autoPlay
                loop
                muted
                playsInline
                showPlayButton
                mediaClickable
                onPlayClick={openYouTubeChannel}
                showDecorations={false}
                className="ride-brush-frame"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RideExplore;
