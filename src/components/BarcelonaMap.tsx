"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Place } from "@/data/places";

type BarcelonaMapProps = {
  places: Place[];
  selectedPlaceId: string;
};

export default function BarcelonaMap({
  places,
  selectedPlaceId,
}: BarcelonaMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, HTMLDivElement>>({});
  const popupsRef = useRef<Record<string, mapboxgl.Popup>>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [2.1734, 41.3851],
      zoom: 12.5,
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};
    popupsRef.current = {};

    places.forEach((place) => {
      const popup = new mapboxgl.Popup({ offset: 24 }).setHTML(`
        <div style="font-family: sans-serif; max-width: 220px;">
          <h3 style="font-size: 16px; margin: 0 0 6px; font-weight: 700;">
            ${place.name}
          </h3>
          <p style="margin: 0 0 6px; color: #555;">
            ${place.neighborhood} · ${place.price}
          </p>
          <p style="margin: 0; color: #333;">
            ${place.description}
          </p>
        </div>
      `);

      const marker = document.createElement("div");
      marker.style.width = "18px";
      marker.style.height = "18px";
      marker.style.borderRadius = "999px";
      marker.style.background = "#1F1F1F";
      marker.style.border = "3px solid #F7F1E8";
      marker.style.boxShadow = "0 4px 10px rgba(0,0,0,0.25)";
      marker.style.cursor = "pointer";
      marker.style.transition = "all 0.2s ease";

      markersRef.current[place.id] = marker;
      popupsRef.current[place.id] = popup;

      new mapboxgl.Marker(marker)
        .setLngLat([place.lng, place.lat])
        .setPopup(popup)
        .addTo(mapRef.current!);
    });
  }, [places]);

  useEffect(() => {
    const selectedPlace = places.find((place) => place.id === selectedPlaceId);

    if (!selectedPlace || !mapRef.current) return;

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isSelected = id === selectedPlaceId;

      marker.style.width = isSelected ? "28px" : "18px";
      marker.style.height = isSelected ? "28px" : "18px";
      marker.style.background = isSelected ? "#C47B4D" : "#1F1F1F";
      marker.style.zIndex = isSelected ? "10" : "1";
    });

    mapRef.current.flyTo({
      center: [selectedPlace.lng, selectedPlace.lat],
      zoom: 14,
      duration: 900,
    });

    const popup = popupsRef.current[selectedPlaceId];

    if (popup) {
      popup
        .setLngLat([selectedPlace.lng, selectedPlace.lat])
        .addTo(mapRef.current);
    }
  }, [selectedPlaceId, places]);

  return <div ref={mapContainer} className="h-full w-full" />;
}