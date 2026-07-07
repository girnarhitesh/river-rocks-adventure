import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import "swiper/css";
import "./HeroHome.css";

const kayakVariants = [
  { name: "Sunrise Yellow" },
];

const HeroHome = () => {
  const swiperRef = useRef(null);
  const heroRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Raw pointer position normalised to [-0.5, 0.5] ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const kayakX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-28, 28]), { stiffness: 40, damping: 15 });
  const kayakY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-14, 14]), { stiffness: 40, damping: 15 });
  const kayakRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 40, damping: 15 });
  const kayakRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 40, damping: 15 });

  /* ── Shadow scale mirrors parallax X for depth ── */
  const shadowScaleX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0.82, 1.18]), { stiffness: 40, damping: 15 });

  function handleMouseMove(e) {
    const r = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      id="hero-home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* Background video */}
      <div className="BeachTopViewImage">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-bg-video"
        >
          <source src="/Images/Video/River&RocksRaftingVideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="kayak-slider-section">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          loop={true}
          speed={650}
          grabCursor={true}
          className="kayak-swiper"
        >
          {kayakVariants.map((variant, index) => (
            <SwiperSlide key={index}>
              <div className="kayak-slide">

                {/* ── Parallax + 3-D tilt wrapper ─────────────────── */}
                <motion.div
                  className="kayak-3d-wrapper"
                  style={{
                    x: kayakX,
                    y: kayakY,
                    rotateY: kayakRotateY,
                    rotateX: kayakRotateX,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* ── Continuous water-bob animation ───────────── */}
                  <motion.img
                    src="/Images/IllustrationImages/Untitled design.png"
                    alt={`${variant.name} Kayak`}
                    className="kayak-image"
                    draggable={false}
                    animate={{
                      y: [0, -18, 0],
                      rotate: [-1.5, 1.5, -1.5],
                    }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "mirror",
                    }}
                  />

                  {/* ── Breathing water shadow ────────────────────── */}
                  <motion.div
                    className="kayak-water-shadow"
                    style={{ scaleX: shadowScaleX }}
                    animate={{
                      scaleX: [1, 0.85, 1],
                      opacity: [0.45, 0.28, 0.45],
                    }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "mirror",
                    }}
                  />
                </motion.div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Rafting
        </motion.h1>

        <div className="hero-bottom">
          {/* Left: product info */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          >
            <h2 className="hero-product-name">Safe & Secure Rafting Adventure</h2>
            <p className="hero-description">
              From thrilling adventures to cultural escapes, River & Rock Adventure helps you explore India with carefully planned tours, experienced guides, and personalized travel services.
            </p>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          >
            <span className="hero-spec">
              Minimum Weight: 40 kg &nbsp;|&nbsp; Minimum Age: 12 Years
            </span>
            <span className="hero-spec">
              Maximum Weight: 110 kg &nbsp;|&nbsp; Maximum Age: 60 Years
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroHome;
