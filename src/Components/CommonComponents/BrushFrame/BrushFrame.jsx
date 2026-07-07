import React, { useMemo } from "react";
import styles from "./BrushFrame.module.css";
import {
  BRUSH_FRAME_DEFAULTS,
  DEFAULT_BRUSH_MASK,
} from "./brushFrameDefaults";

const VIDEO_EXT = /\.(mp4|webm|ogg|mov)(\?|#|$)/i;

/**
 * BrushFrame — organic paint-brush media frame with mask clipping and overlay.
 *
 * @example
 * // Image
 * <BrushFrame
 *   src="https://images.unsplash.com/photo-1680115165737-dab691a2d1bf"
 *   alt="Kayaking"
 *   showPlayButton
 * />
 *
 * @example
 * // Video with custom assets
 * <BrushFrame
 *   src="/videos/rafting.mp4"
 *   mediaType="video"
 *   poster="/posters/rafting.jpg"
 *   maskSrc="/assets/custom-mask.png"
 *   overlaySrc="/assets/custom-overlay.png"
 *   aspectRatio="4 / 5"
 * />
 */
const BrushFrame = ({
  src,
  mediaType = "auto",
  alt = "",
  poster,
  maskSrc,
  overlaySrc = BRUSH_FRAME_DEFAULTS.overlaySrc,
  strokeSrc = BRUSH_FRAME_DEFAULTS.strokeSrc,
  splatterSrc = BRUSH_FRAME_DEFAULTS.splatterSrc,
  maskSize = "100% 100%",
  maskPosition = "center",
  animateMedia = false,
  showDecorations = true,
  showPlayButton = false,
  onPlayClick,
  mediaClickable = false,
  className = "",
  mediaClassName = "",
  aspectRatio = "1",
  maxWidth = "430px",
  objectPosition = "center",
  objectFit = "cover",
  mediaScale = 1.08,
  autoPlay = false,
  loop = true,
  muted = true,
  playsInline = true,
  children,
  ...rest
}) => {
  const isVideo = useMemo(() => {
    if (mediaType === "video") return true;
    if (mediaType === "image") return false;
    return VIDEO_EXT.test(src);
  }, [mediaType, src]);

  const maskImage = maskSrc ? `url("${maskSrc}")` : DEFAULT_BRUSH_MASK;

  const rootStyle = {
    "--bf-ratio": aspectRatio,
    "--bf-max-width": maxWidth,
    "--bf-mask-image": maskImage,
    "--bf-mask-size": maskSize,
    "--bf-mask-position": maskPosition,
    "--bf-overlay-image": overlaySrc ? `url("${overlaySrc}")` : "none",
    "--bf-object-position": objectPosition,
    "--bf-object-fit": objectFit,
    "--bf-media-scale": mediaScale,
  };

  const mediaClasses = [
    styles.media,
    animateMedia ? styles.mediaAnimate : "",
    mediaClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const handleMediaClick = mediaClickable && onPlayClick ? onPlayClick : undefined;

  return (
    <div
      className={`${styles.root} ${className}`.trim()}
      style={rootStyle}
      {...rest}
    >
      <div
        className={`${styles.mediaShell} ${handleMediaClick ? styles.mediaShellClickable : ""}`.trim()}
        onClick={handleMediaClick}
        onKeyDown={
          handleMediaClick
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onPlayClick();
                }
              }
            : undefined
        }
        role={handleMediaClick ? "button" : undefined}
        tabIndex={handleMediaClick ? 0 : undefined}
        aria-label={handleMediaClick ? "Watch on YouTube" : undefined}
      >
        {isVideo ? (
          <video
            className={mediaClasses}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
          />
        ) : (
          <img
            className={mediaClasses}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      {overlaySrc ? (
        <img
          src={overlaySrc}
          alt=""
          className={styles.overlay}
          aria-hidden="true"
          draggable={false}
        />
      ) : null}

      {showDecorations && (
        <div className={styles.decorLayer} aria-hidden="true">
          <div className={styles.strokes}>
            {strokeSrc ? (
              <img src={strokeSrc} alt="" className={styles.strokesAsset} />
            ) : null}
          </div>

          <div className={styles.splatters}>
            {splatterSrc ? (
              <img src={splatterSrc} alt="" className={styles.splatterAsset} />
            ) : (
              <>
                <span />
                <span />
                <span />
                <span />
              </>
            )}
          </div>
        </div>
      )}

      {showPlayButton && (
        <button
          type="button"
          className={styles.playButton}
          aria-label="Watch on YouTube"
          onClick={onPlayClick}
        >
          <span />
        </button>
      )}

      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
};

export default BrushFrame;
