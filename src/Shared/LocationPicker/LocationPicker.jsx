import { Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LocationPicker.css';

function LocationPicker({ position, onChange }) {
  useMapEvents({
    click(e) {
      onChange([e.latlng.lat, e.latlng.lng]);
    }
  });
  // Only render marker when a valid position array provided
  if (!position || position.length !== 2) return null;
  return <Marker position={position} />;
}

export default LocationPicker;