import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePins from "../hooks/usepins.js";

export default function PinCard({ pin }) {
  const { savedPinIds, toggleSavePin } = usePins();
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);
  const isSaved = savedPinIds.includes(pin.id);
  const image = pin.imageUrl || pin.image;
  return <article className="pin">
    <button type="button" className="pin-image-button" onClick={() => navigate(`/pin/${pin.id}`)} aria-label={`View ${pin.title || "pin"}`}>
      {image && !imageFailed ? <img src={image} alt={pin.title || "Inspiration pin"} className="pin-photo" loading="lazy" onError={() => setImageFailed(true)} /> : <div className="pin-image-fallback">Image unavailable</div>}
      <span className="pin-overlay-save" aria-hidden="true">View idea ↗</span>
    </button>
    <div className="pin-info"><div className="pin-copy"><button type="button" className="pin-title-button" onClick={() => navigate(`/pin/${pin.id}`)}>{pin.title || "Untitled Pin"}</button><small>{pin.author || pin.creator || "Pinspire community"}</small></div><button type="button" aria-pressed={isSaved} aria-label={isSaved ? `Unsave ${pin.title}` : `Save ${pin.title}`} className={isSaved ? "save saved" : "save"} onClick={() => toggleSavePin(pin.id)}>{isSaved ? "Saved" : "Save"}</button></div>
  </article>;
}
