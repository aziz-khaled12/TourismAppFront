import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RoleForm = ({ role = 'Hotel', onSubmit }) => {
  const [formData, setFormData] = useState({
    address: '',
    rating: '',
    plateNumber: '',
    location: { lat: 0, lon: 0 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMapClick = (e) => {
    setFormData((prev) => ({
      ...prev,
      location: { lat: e.latlng.lat, lon: e.latlng.lng },
    }));
    getAddress(e.latlng.lat, e.latlng.lng);
  };

  const getAddress = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    console.log(data)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Custom component for handling map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <form onSubmit={handleSubmit}>
      {(role === 'Hotel' || role === 'Restaurant' || role === 'Agency') && (
        <>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
            required
          />
          <div style={{ height: '300px', margin: '10px 0' }}>
            <MapContainer
              center={[36.752887, 3.042048]} // Default location (Algiers)
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler />
              <Marker position={[formData.location.lat, formData.location.lon]} />
            </MapContainer>
          </div>
        </>
      )}
      {role === 'Taxi' && (
        <input
          type="text"
          name="plateNumber"
          placeholder="Car Plate Number"
          value={formData.plateNumber}
          onChange={handleChange}
          required
        />
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default RoleForm;
