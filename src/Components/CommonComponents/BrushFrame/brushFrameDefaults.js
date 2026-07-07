export const BRUSH_FRAME_DEFAULTS = {
  overlaySrc: "/Images/IllustrationImages/VideoOuterShapeImage.png",
  brushMaskSrc: "/Images/brush-overlay.png",
  strokeSrc: null,
  splatterSrc: null,
};

/** Organic feathered ellipse — white = visible, black = hidden */
export const DEFAULT_BRUSH_MASK = `url("data:image/svg+xml,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
  <defs>
    <filter id='feather' x='-30%' y='-30%' width='160%' height='160%'>
      <feGaussianBlur stdDeviation='2.8' />
    </filter>
  </defs>
  <ellipse cx='50' cy='50.5' rx='35.5' ry='35' fill='white' filter='url(%23feather)' />
</svg>
`)}")`;
