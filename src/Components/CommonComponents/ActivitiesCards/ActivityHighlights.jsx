import React from "react";

const ActivityHighlights = ({ highlights = [], jumpStyle, className = "" }) => {
  if (!highlights.length && !jumpStyle) return null;

  return (
    <ul className={`activity-highlights ${className}`.trim()}>
      {jumpStyle && (
        <li
          className={`activity-highlights__tag activity-highlights__tag--${jumpStyle}`}
        >
          {jumpStyle === "normal" ? "Normal Jump" : "Freestyle Jump"}
        </li>
      )}
      {highlights.map((tag) => (
        <li key={tag} className="activity-highlights__tag">
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default ActivityHighlights;
