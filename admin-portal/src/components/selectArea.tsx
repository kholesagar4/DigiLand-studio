import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Ensure correct typing for map and marker
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [info, setInfo] = useState({
    address: "",
    postalCode: "",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    };

    const initMap = () => {
      const initialCenter = { lat: 20.5937, lng: 78.9629 }; // Centered on India
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: initialCenter,
          zoom: 5,
        });
        setMap(mapInstance);

        // Add click listener to the map
        mapInstance.addListener("click", (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            const clickedLatLng = e.latLng;
            placeMarker(clickedLatLng, mapInstance);
            fetchAddress(clickedLatLng.lat(), clickedLatLng.lng());
          }
        });
      }
    };

    const placeMarker = (
      latLng: google.maps.LatLng,
      mapInstance: google.maps.Map
    ) => {
      if (marker) {
        marker.setPosition(latLng);
      } else {
        const newMarker = new google.maps.Marker({
          position: latLng,
          map: mapInstance,
        });
        setMarker(newMarker);
      }
    };

    const fetchAddress = (lat: number, lng: number) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const addressComponents = results[0].address_components;
          const postalCode =
            addressComponents.find((comp) => comp.types.includes("postal_code"))
              ?.long_name || "N/A";
          setInfo({
            address: results[0].formatted_address,
            postalCode,
            lat: lat.toFixed(6),
            lng: lng.toFixed(6),
          });
        }
      });
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initMap();
    }
  }, [marker]);

  return (
    <div className="flex bg-gradient-to-r from-green-100 via-green-200 to-green-300 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Select Area on Map</h2>
          <div
            ref={mapRef}
            id="map"
            className="w-full h-96 mb-6 rounded-xl shadow-xl"
          ></div>

          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Selected Area Details
            </h3>

            <div className="flex gap-6 mb-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-green-600 mb-2"
                  htmlFor="address"
                >
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  value={info.address}
                  readOnly
                  className="w-full p-3 border border-green-300 rounded-md bg-gray-100 text-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-green-600 mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={info.postalCode}
                  readOnly
                  className="w-full p-3 border border-green-300 rounded-md bg-gray-100 text-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
                />
              </div>
            </div>

            <table className="w-full border-collapse border border-green-300 mt-4">
              <thead>
                <tr>
                  <th className="border border-green-300 p-3 text-left text-green-600">Field</th>
                  <th className="border border-green-300 p-3 text-left text-green-600">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-300 p-3 text-green-500">Latitude</td>
                  <td className="border border-green-300 p-3 text-green-500">{info.lat}</td>
                </tr>
                <tr>
                  <td className="border border-green-300 p-3 text-green-500">Longitude</td>
                  <td className="border border-green-300 p-3 text-green-500">{info.lng}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MapPage;
