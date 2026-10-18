
import { useAppContext } from "../context/ContextTemp";
import PinGrid from "../components/PinGridTemp.jsx";

export default function Home() {
  const { pins } = useAppContext();

  return (
    <main className="page-container">
      <section className="home-heading">
        <h1>Find your inspiration</h1>
        <p>Discover ideas worth saving.</p>
      </section>

      <PinGrid pins={pins} />
    </main>
  );
}
