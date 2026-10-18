
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(event) {
    event.preventDefault()

    const value = query.trim()

    if (value) {
      navigate(`/search?q=${encodeURIComponent(value)}`)
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Search for ideas..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}
