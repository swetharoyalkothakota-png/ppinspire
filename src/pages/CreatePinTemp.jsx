import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextTemp";

const categories = ["Architecture", "Fashion", "Food", "Travel", "Art", "Interior Design", "Photography", "Nature", "Technology"];

export default function CreatePin() {
  const { addPin } = useAppContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Art");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      setMessage("Please add a title and image URL.");
      return;
    }
    try { new URL(imageUrl); } catch { setMessage("Please enter a valid image URL."); return; }
    addPin({
      title: title.trim(), description: description.trim(), category,
      imageUrl: imageUrl.trim(), author: localStorage.getItem("pinterest-profile-name") || "You",
      keywords: tags.split(",").map(tag => tag.trim().toLowerCase()).filter(Boolean),
      createdAt: new Date().toISOString(),
    });
    setMessage("Pin created successfully!");
    navigate("/");
  }

  return <main className="page-container">
    <section className="home-heading"><h1>Create a Pin ✨</h1><p>Save an idea to your inspiration board.</p></section>
    <form className="create-form enhanced-form" onSubmit={handleSubmit}>
      <div className="create-preview">
        {imageUrl && !previewError ? <img src={imageUrl} alt="Pin preview" onError={() => setPreviewError(true)} onLoad={() => setPreviewError(false)} /> : <div className="preview-placeholder">{previewError ? "Image could not be loaded" : "Your image preview appears here"}</div>}
      </div>
      <label htmlFor="pin-image">Image URL *</label>
      <input id="pin-image" type="url" value={imageUrl} onChange={e => { setImageUrl(e.target.value); setPreviewError(false); }} placeholder="https://images.unsplash.com/..." required />
      <label htmlFor="pin-title">Title *</label>
      <input id="pin-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Give your Pin a title" maxLength={100} required />
      <label htmlFor="pin-description">Description</label>
      <textarea id="pin-description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell everyone what makes this idea special" rows={3} />
      <label htmlFor="pin-category">Category</label>
      <select id="pin-category" value={category} onChange={e => setCategory(e.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select>
      <label htmlFor="pin-tags">Tags (comma separated)</label>
      <input id="pin-tags" value={tags} onChange={e => setTags(e.target.value)} placeholder="minimal, cozy, inspiration" />
      {message && <p role="status" className="form-message">{message}</p>}
      <div className="form-actions"><button type="button" className="secondary-btn" onClick={() => navigate(-1)}>Cancel</button><button type="submit" className="auth-submit">Create Pin</button></div>
    </form>
  </main>;
}
