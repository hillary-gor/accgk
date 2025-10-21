"use client";

import { useEffect, useRef } from "react";
import useGoogleMaps from "@/hooks/useGoogleMaps";

interface MapPreviewProps {
  lat: number;
  lng: number;
  radius: number;
}

export default function MapPreview({ lat, lng, radius }: MapPreviewProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  const { ready, error } = useGoogleMaps();

  useEffect(() => {
    if (!ready || error) return;
    if (!window.google || !mapRef.current) return;

    const center = new google.maps.LatLng(lat, lng);

    // Initialize map if not already
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        mapTypeId: "roadmap",
      });
    } else {
      mapInstanceRef.current.setCenter(center);
    }

    // Initialize or update circle
    if (!circleRef.current) {
      circleRef.current = new google.maps.Circle({
        strokeColor: "#3b82f6",
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: "#3b82f6",
        fillOpacity: 0.2,
        map: mapInstanceRef.current,
        center,
        radius: radius * 1000,
      });
    } else {
      circleRef.current.setCenter(center);
      circleRef.current.setRadius(radius * 1000);
    }
  }, [ready, error, lat, lng, radius]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Failed to load map
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "200px" }}
    >
      {!ready && (
        <div className="flex items-center justify-center h-full text-gray-400">
          Loading map…
        </div>
      )}
    </div>
  );
}
