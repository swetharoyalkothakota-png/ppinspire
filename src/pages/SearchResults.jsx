
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/ContextTemp";
import PinGrid from "../components/PinGridTemp.jsx";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { pins } = useAppContext();

  const results = pins.filter((pin) =>
    `${pin.title} ${pin.category} ${(pin.keywords || []).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <main className="page-container">
      <section className="home-heading">
        <h1>Search Results</h1>
        <p>
          {query
            ? `Results for "${query}"`
            : "Search for ideas and inspiration."}
        </p>
      </section>

      <PinGrid pins={results} />

      {results.length === 0 && (
        <p className="empty">No pins found. Try another search.</p>
      )}
    </main>
  );
}
