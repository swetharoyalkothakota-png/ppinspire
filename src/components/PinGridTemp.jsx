import PinCard from './PinCard.jsx';

function PinGrid({ pins = [] }) {
  if (pins.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Pins Found</h2>
        <p>Try exploring other ideas!</p>
      </div>
    );
  }

  return (
    <div className="pin-grid">
      {pins.map((pin) => (
        <PinCard key={pin.id} pin={pin} />
      ))}
    </div>
  );
}

export default PinGrid;