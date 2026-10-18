
import { createContext, useContext, useEffect, useState } from "react";
import initialPins from "../data/pins";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [pins, setPins] = useState(() => {
    try {
      const saved = localStorage.getItem("pinterest-pins");
      return saved ? JSON.parse(saved) : initialPins;
    } catch {
      return initialPins;
    }
  });

  const [savedPinIds, setSavedPinIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pinterest-saved") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("pinterest-pins", JSON.stringify(pins));
  }, [pins]);

  useEffect(() => {
    localStorage.setItem("pinterest-saved", JSON.stringify(savedPinIds));
  }, [savedPinIds]);

  function addPin(pin) {
    setPins(previous => [{ ...pin, id: Date.now() }, ...previous]);
  }

  function toggleSavePin(pinId) {
    setSavedPinIds(previous =>
      previous.includes(pinId)
        ? previous.filter(id => id !== pinId)
        : [...previous, pinId]
    );
  }

  function deletePin(pinId) {
    setPins(previous => previous.filter(pin => pin.id !== pinId));
    setSavedPinIds(previous => previous.filter(id => id !== pinId));
  }

  return (
    <AppContext.Provider
      value={{ pins, savedPinIds, addPin, toggleSavePin, deletePin }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
