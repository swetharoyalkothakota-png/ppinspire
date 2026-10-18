
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Home",
    path: "/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z" />
      </svg>
    ),
  },
  {
    label: "Explore",
    path: "/explore",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.8" cy="10.8" r="7.3" />
        <path d="m16.2 16.2 4.3 4.3M8 13l2-4 4-2-2 4z" />
      </svg>
    ),
  },
  {
    label: "Saved",
    path: "/saved",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3.5h12v17l-6-4-6 4z" />
      </svg>
    ),
  },
  {
    label: "Create",
    path: "/create",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    label: "Profile",
    path: "/profile",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
      </svg>
    ),
  },
];

export default function Sidebar({ userName = "", userEmail = "" }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">P</span>
        <span>Pinspire</span>
      </div>

      <nav className="sidebar-menu" aria-label="Main navigation">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      
      
<div className="sidebar-profile">
  <div className="sidebar-avatar">
    {(userName.trim().charAt(0) || "U").toUpperCase()}
  </div>

  <div className="sidebar-user-info">
    <strong>{userName || "User"}</strong>
    <span>{userEmail || "Personal account"}</span>
  </div>
</div>


      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-settings"
          onClick={() => window.location.assign("/profile")}
        >
          <span className="settings-icon">⚙</span>
          <span>Profile settings</span>
        </button>

        <p>Find ideas. Save inspiration.</p>
      </div>

    </aside>
  );
}
