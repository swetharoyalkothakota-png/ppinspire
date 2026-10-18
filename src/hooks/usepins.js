
import { useAppContext } from "../context/ContextTemp.jsx";

export default function usePins() {
  const context = useAppContext();

  if (!context) {
    throw new Error("usePins must be used inside AppProvider");
  }

  const {
    pins,
    savedPinIds,
    addPin,
    toggleSavePin,
    deletePin
  } = context;

  const searchPins = (query = "") => {
    const term = query.trim().toLowerCase();

    if (!term) return pins;

    return pins.filter((pin) => {
      const text = [
        pin.title,
        pin.category,
        pin.author,
        ...(pin.keywords || [])
      ].join(" ").toLowerCase();

      return text.includes(term);
    });
  };

  const savedPins = pins.filter((pin) =>
    savedPinIds.includes(pin.id)
  );

  return {
    pins,
    savedPinIds,
    savedPins,
    addPin,
    toggleSavePin,
    deletePin,
    searchPins
  };
}
