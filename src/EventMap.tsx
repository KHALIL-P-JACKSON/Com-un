import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { Listing } from './data';

export default function EventMap({
  items,
  onSelect,
}: {
  items: Listing[];
  onSelect: (item: Listing) => void;
}) {
  return (
    <div
      className="map-frame"
      aria-label="Map of sample opportunities in Atlanta"
    >
      <MapContainer
        center={[33.761, -84.39]}
        zoom={13}
        scrollWheelZoom={false}
        className="event-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map((item) => (
          <CircleMarker
            key={item.id}
            center={item.coordinates}
            radius={10}
            pathOptions={{
              color: '#ffffff',
              weight: 3,
              fillColor: item.category === 'Internship' ? '#934b27' : '#224f41',
              fillOpacity: 1,
            }}
          >
            <Popup>
              <strong>{item.title}</strong>
              <p>{item.organization}</p>
              <button className="map-link" onClick={() => onSelect(item)}>
                View opportunity
              </button>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <p className="map-caption">
        Sample locations in Atlanta, GA. Select a marker, or use the accessible
        list below. Map tiles need an internet connection.
      </p>
    </div>
  );
}
