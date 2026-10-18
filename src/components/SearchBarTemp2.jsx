```jsx
import { useState } from "react";

export default function SearchBarTemp2({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  }

  return (
    <input
      type="search"
      className="search"
      placeholder="Search ideas..."
      value={query}
      onChange={handleChange}
      aria-label="Search pins"
    />
  );
}
```