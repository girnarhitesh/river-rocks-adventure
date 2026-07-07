import BrushFrame from "./BrushFrame";

/**
 * Sample usage — copy into any page or section.
 */
export function BrushFrameImageExample() {
  return (
    <BrushFrame
      src="https://images.unsplash.com/photo-1680115165737-dab691a2d1bf?q=80&w=926&auto=format&fit=crop"
      alt="Kayaking on calm water"
      showPlayButton
      showDecorations
    />
  );
}

export function BrushFrameVideoExample() {
  return (
    <BrushFrame
      src="/Images/Video/HeroHomeVideo.mp4"
      mediaType="video"
      poster="/Images/IllustrationImages/BeachTopViewImage.jpg"
      autoPlay
      loop
      muted
      maskSrc="/Images/IllustrationImages/custom-mask.png"
      overlaySrc="/Images/IllustrationImages/VideoOuterShapeImage.png"
      aspectRatio="1"
      maxWidth="480px"
      objectPosition="center top"
    />
  );
}

export function BrushFrameCustomAssetsExample() {
  return (
    <BrushFrame
      src="/Images/IllustrationImages/KayakingIllustrationImage.png"
      alt="Kayaking illustration"
      overlaySrc="/Images/IllustrationImages/VideoOuterShapeImage.png"
      strokeSrc="/Images/IllustrationImages/custom-strokes.png"
      splatterSrc="/Images/IllustrationImages/custom-splatters.png"
      className="my-brush-frame"
    />
  );
}
