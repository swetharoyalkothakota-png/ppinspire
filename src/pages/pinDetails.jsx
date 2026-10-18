import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/ContextTemp.jsx";
import PinGrid from "../components/PinGridTemp.jsx";

export default function PinDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pins, savedPinIds, toggleSavePin } = useAppContext();
  const pin = pins.find(item => String(item.id) === String(id));
  if (!pin) return <main className="page-container detail-missing"><h1>Pin not found</h1><p>This idea may have been removed.</p><button className="secondary-btn" onClick={() => navigate(-1)}>Go back</button></main>;
  const related = pins.filter(item => item.id !== pin.id && item.category === pin.category).slice(0, 8);
  return <main className="page-container pin-detail-page"><button className="secondary-btn back-btn" onClick={() => navigate(-1)}>← Back</button><article className="pin-detail-card"><img src={pin.imageUrl || pin.image} alt={pin.title} onError={event => { event.currentTarget.src = "https://placehold.co/700x900?text=Image+unavailable"; }} /><div className="pin-detail-copy"><div className="detail-actions"><button className={savedPinIds.includes(pin.id) ? "save saved" : "save"} onClick={() => toggleSavePin(pin.id)}>{savedPinIds.includes(pin.id) ? "Saved" : "Save"}</button></div><span className="detail-category">{pin.category || "Inspiration"}</span><h1>{pin.title}</h1><p>{pin.description || "A little inspiration for your next idea."}</p><p className="detail-creator">Created by <strong>{pin.author || pin.creator || "Creative explorer"}</strong></p>{pin.keywords?.length > 0 && <div className="detail-tags">{pin.keywords.map(tag => <span key={tag}>#{tag}</span>)}</div>}<Link className="secondary-btn link-btn" to="/explore">Explore more ideas</Link></div></article>{related.length > 0 && <section className="related-section"><h2>More like this</h2><PinGrid pins={related} /></section>}</main>;
}
