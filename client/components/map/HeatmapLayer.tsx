import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

// Use a type assertion instead of module augmentation
const LHeat = L as any;

interface HeatPoint {
  lat: number;
  lng: number;
  intensity: number;
}

interface HeatmapLayerProps {
  points: HeatPoint[];
  radius?: number;
  blur?: number;
  maxZoom?: number;
  max?: number;
  gradient?: Record<number, string>;
}

export function HeatmapLayer({
  points,
  radius = 25,
  blur = 15,
  maxZoom = 18,
  max = 1.0,
  gradient = { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
}: HeatmapLayerProps) {
  const map = useMap();
  
  useEffect(() => {
    if (!points || points.length === 0) return;

    const data = points.map(p => [p.lat, p.lng, p.intensity] as [number, number, number]);
    
    const heatLayer = LHeat.heatLayer(data, {
      radius,
      blur,
      maxZoom,
      max,
      gradient
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points, radius, blur, maxZoom, max, gradient]);

  return null;
}