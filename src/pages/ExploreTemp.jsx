
import { useAppContext } from "../context/ContextTemp";
import PinGrid from "../components/PinGridTemp.jsx";
import categories from "../data/catagories.js";

export default function Explore() {
  const { pins } = useAppContext();

  return (
    <main className="page-container">
      <section className="home-heading">
        <h1>Explore Ideas</h1>
        <p>Discover inspiration across different categories.</p>
      </section>

      <section>
        <h2>All Ideas</h2>
        <PinGrid pins={pins} />
      </section>

      {categories.map((category) => {
        const categoryPins = pins.filter(
          (pin) =>
            pin.category?.toLowerCase() ===
            category.name.toLowerCase()
        );

        return (
          <section key={category.id}>
            <h2>{category.name}</h2>
            <PinGrid pins={categoryPins} />
          </section>
        );
      })}
    </main>
  );
}
