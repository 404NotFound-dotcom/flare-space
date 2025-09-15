import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, Polyline, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

export type MapPin = {
  lat: number;
  lng: number;
  type: "risk" | "shelter" | "service" | "team" | "route";
  name: string;
  status?: string;
  contact?: string;
};

export type HeatPoint = { lat: number; lng: number; intensity?: number };

function HeatmapLayer({ points, enabled }: { points: HeatPoint[]; enabled: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!enabled || !points.length) return;
    const heatPoints = points.map((p) => [p.lat, p.lng, p.intensity ?? 0.6]) as [number, number, number][];
    const layer = (L as any).heatLayer(heatPoints, { radius: 25, blur: 15 });
    layer.addTo(map);
    return () => {
      map.removeLayer(layer);
    };
  }, [map, points, enabled]);
  return null;
}

function MapController({ centerTo }: { centerTo?: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    if (centerTo) {
      map.flyTo([centerTo.lat, centerTo.lng], map.getZoom());
    }
  }, [centerTo, map]);
  return null;
}

export function InteractiveMap({
  center = { lat: 28.6139, lng: 77.209 },
  zoom = 12,
  pins = [],
  show = { risk: true, shelters: true, services: true, team: true, route: true },
  className = "h-64 rounded-xl border overflow-hidden",
  heat = { enabled: false, points: [] },
  route,
  userLocation,
}: {
  center?: { lat: number; lng: number };
  zoom?: number;
  pins?: MapPin[];
  show?: { risk: boolean; shelters: boolean; services: boolean; team?: boolean; route?: boolean };
  className?: string;
  heat?: { enabled: boolean; points: HeatPoint[] };
  route?: { lat: number; lng: number }[];
  userLocation?: { lat: number; lng: number } | null;
}) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const { BaseLayer } = LayersControl;

  const filtered = useMemo(
    () =>
      pins.filter((p) =>
        (p.type === "risk" && show.risk) ||
        (p.type === "shelter" && show.shelters) ||
        (p.type === "service" && show.services) ||
        (p.type === "team" && (show.team ?? true)) ||
        (p.type === "route" && (show.route ?? true)),
      ),
    [pins, show],
  );

  return (
    <div className={className}>
      <MapContainer 
        center={[center.lat, center.lng] as [number, number]} 
        zoom={zoom} 
        className="h-full w-full"
      >
        <MapController centerTo={userLocation ?? undefined} />
        <LayersControl position="topright">
          <BaseLayer checked={!dark} name="Light">
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer checked={dark} name="Dark">
            <TileLayer
              attribution='&copy; CARTO, OpenStreetMap contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>
          <LayerGroup>
            <MarkerClusterGroup chunkedLoading>
              {filtered.map((p, i) => (
                <Marker key={`${p.name}-${i}`} position={[p.lat, p.lng]}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold">{p.name}</div>
                      {p.status && <div>Status: {p.status}</div>}
                      {p.contact && <div>Contact: {p.contact}</div>}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lng]}>
                <Popup>Your Location</Popup>
              </Marker>
            )}
            {route && route.length > 1 && (
              <Polyline positions={route.map((p) => [p.lat, p.lng]) as [number, number][]} color="#0096C7" weight={5} />)
            }
          </LayerGroup>
        </LayersControl>
        <HeatmapLayer points={heat.points} enabled={heat.enabled} />
      </MapContainer>
    </div>
  );
}
