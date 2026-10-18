import { useEffect, useState } from "react";
import { useAppContext } from "../context/ContextTemp";
import PinGrid from "../components/PinGridTemp.jsx";

export default function Profile() {
  const { pins, savedPinIds } = useAppContext();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem("pinterest-profile-name") || "Swetha");
  const [username, setUsername] = useState(() => localStorage.getItem("pinterest-profile-username") || "@creativeexplorer");
  const [bio, setBio] = useState(() => localStorage.getItem("pinterest-profile-bio") || "Collecting ideas that make everyday life beautiful.");
  const [draft, setDraft] = useState({ name, username, bio });
  const [notice, setNotice] = useState("");
  useEffect(() => { localStorage.setItem("pinterest-profile-name", name); }, [name]);
  function saveProfile(event) {
    event.preventDefault();
    if (!draft.name.trim() || !draft.username.trim()) { setNotice("Name and username are required."); return; }
    setName(draft.name.trim()); setUsername(draft.username.trim()); setBio(draft.bio.trim());
    localStorage.setItem("pinterest-profile-name", draft.name.trim());
    localStorage.setItem("pinterest-profile-username", draft.username.trim());
    localStorage.setItem("pinterest-profile-bio", draft.bio.trim());
    setEditing(false); setNotice("Profile updated.");
  }
  return <main className="page-container">
    <section className="home-heading profile-heading">
      <div className="profile-avatar">{name.charAt(0).toUpperCase() || "U"}</div><h1>{name}</h1><p>{username}</p><p>{bio}</p>
      <div className="profile-stats"><div><strong>{pins.length}</strong><p>Created pins</p></div><div><strong>{savedPinIds.length}</strong><p>Saved ideas</p></div></div>
      <button className="secondary-btn" onClick={() => { setDraft({ name, username, bio }); setEditing(value => !value); }}>{editing ? "Cancel editing" : "Edit profile"}</button>
      {editing && <form className="profile-edit-form" onSubmit={saveProfile}><label htmlFor="profile-name">Display name</label><input id="profile-name" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} required /><label htmlFor="profile-username">Username</label><input id="profile-username" value={draft.username} onChange={e => setDraft({ ...draft, username: e.target.value })} required /><label htmlFor="profile-bio">Bio</label><textarea id="profile-bio" rows={3} value={draft.bio} onChange={e => setDraft({ ...draft, bio: e.target.value })} /><button className="auth-submit" type="submit">Save profile</button></form>}
      {notice && <p role="status" className="form-message">{notice}</p>}
    </section>
    <h2>Your pins</h2><PinGrid pins={pins.filter(pin => pin.author === name || pin.author === "You")} />
  </main>;
}
