
import { useAppContext } from "../context/ContextTemp";
import PinGrid from "../components/PinGridTemp.jsx";

export default function Saved() {
  const { pins, savedPinIds } = useAppContext();

  const savedPins = pins.filter((pin) => savedPinIds.includes(pin.id));

  return (
    <main className="page-container">
      <section className="home-heading">
        <h1>Saved Ideas ❤️</h1>
        <p>Your favorite inspiration in one place.</p>
      </section>

      <PinGrid pins={savedPins} />
    </main>
  );
}
