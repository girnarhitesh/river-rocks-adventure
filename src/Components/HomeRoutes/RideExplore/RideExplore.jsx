import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import RideExploreData from "./RideExploreData";
import "./RideExplore.css";

const openYouTubeChannel = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const BungeeShowcaseVideo = ({ video }) => {
  const videoRef = useRef(null);

  const startPlayback = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;

    el.playbackRate = video.playbackRate ?? 1.5;
    el.loop = true;
    el.currentTime = 0;
    el.play().catch(() => {});
  }, [video.playbackRate]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onLoaded = () => startPlayback();

    const onEnded = () => {
      el.currentTime = 0;
      startPlayback();
    };

    el.addEventListener("loadeddata", onLoaded);
    el.addEventListener("ended", onEnded);

    if (el.readyState >= 2) {
      startPlayback();
    }

    return () => {
      el.removeEventListener("loadeddata", onLoaded);
      el.removeEventListener("ended", onEnded);
    };
  }, [video.src, startPlayback]);

  return (
    <video
      ref={videoRef}
      className="ride-bungee-showcase__video"
      src={video.src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label={video.alt}
    />
  );
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: "easeOut" },
};

const AdventureCard = ({ adventure, index }) => (
  <motion.article
    className={`ride-adventure-card ride-adventure-card--${adventure.accent}`}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
  >
    <div className="ride-adventure-card__head">
      <span className="ride-adventure-card__num">0{index + 1}</span>
      <div>
        <h3>{adventure.label}</h3>
        <span className="ride-adventure-card__badge">{adventure.badge}</span>
      </div>
    </div>
    <ul className="ride-adventure-card__list">
      {adventure.highlights.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </motion.article>
);

const RideExplore = ({ data = RideExploreData }) => {
  const { featuredVideo } = data;

  return (
    <section id="ride-explore" className="ride-explore">
      <div className="ride-explore__glow ride-explore__glow--red" aria-hidden="true" />
      <div className="ride-explore__glow ride-explore__glow--yellow" aria-hidden="true" />

      <div className="ride-explore__marquee" aria-hidden="true">
        <motion.div
          className="ride-explore__marquee-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...data.marquee, ...data.marquee, ...data.marquee, ...data.marquee].map(
            (word, index) => (
              <span key={`${word}-${index}`}>
                {word}
                <i />
              </span>
            ),
          )}
        </motion.div>
      </div>

      <div className="MaxWidthContainer MarginAuto SectionTopBottom ride-explore-wrap">
        <span className="ride-explore-watermark" aria-hidden="true">
          {data.watermark}
        </span>

        <div className="ride-explore-grid">
          <motion.div className="ride-explore-copy" {...fadeUp}>
            <span className="ride-explore-accent" aria-hidden="true" />

            <span className="ride-explore-tag">{data.tag}</span>

            <h2 className="ride-explore-title section-heading-accent">
              <span>{data.title}</span>
            </h2>

            <p className="ride-explore-lead">{data.description}</p>

            <div className="ride-adventure-cards">
              {data.adventures.map((adventure, index) => (
                <AdventureCard key={adventure.id} adventure={adventure} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="ride-explore-visual"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="ride-bungee-showcase"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="ride-bungee-showcase__frame">
                <div
                  className="ride-bungee-showcase__mask-shell"
                  style={{ "--ride-video-mask": `url("${featuredVideo.maskSrc}")` }}
                >
                  <BungeeShowcaseVideo video={featuredVideo} />
                </div>
              </div>

              <div className="ride-bungee-showcase__footer">
                <span className="ride-bungee-showcase__label">{featuredVideo.label}</span>
                <button
                  type="button"
                  className="ride-bungee-showcase__watch"
                  onClick={() => openYouTubeChannel(data.youtubeUrl)}
                >
                  Watch on YouTube
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RideExplore;
