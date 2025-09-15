import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HeatmapLayer } from './map/HeatmapLayer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Map, 
  Layers, 
  MapPin, 
  AlertTriangle, 
  Home, 
  Users, 
  Maximize2, 
  Minimize2,
  Navigation,
  Satellite,
  Globe,
  Route,
  Shield,
  Activity,
  Hospital,
  Warehouse
} from 'lucide-react';

// Default Leaflet icon fix
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Define interfaces for props and data structures
interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: 'disaster' | 'shelter' | 'hospital' | 'volunteer' | 'admin' | 'resource';
  severity?: 'low' | 'medium' | 'high';
  description?: string;
  status?: string;
  capacity?: number;
}

interface HeatPoint {
  lat: number;
  lng: number;
  intensity: number;
}

interface GoogleMapsProps {
  className?: string;
  height?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: MapMarker[];
  showControls?: boolean;
  showLayerControl?: boolean;
  userRole?: 'citizen' | 'volunteer' | 'admin' | 'guest';
  onMarkerClick?: (marker: MapMarker) => void;
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  defaultFullscreen?: boolean;
  showHeatMap?: boolean;
  heatPoints?: HeatPoint[];
}

// Custom hook to handle map state changes like center and zoom
const MapController = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Custom icon logic
const getIcon = (type: MapMarker['type'], severity?: MapMarker['severity']) => {
  let color = '#718096'; // Default gray
  switch (type) {
    case 'disaster':
      color = severity === 'high' ? '#EF4444' : severity === 'medium' ? '#F59E0B' : '#FBBF24';
      break;
    case 'shelter':
      color = '#3B82F6';
      break;
    case 'hospital':
      color = '#10B981';
      break;
    case 'volunteer':
      color = '#8B5CF6';
      break;
    case 'admin':
      color = '#EC4899';
      break;
    case 'resource':
      color = '#14B8A6';
      break;
  }
  
  const iconHtml = `<svg viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  
  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};


export function GoogleMaps({
  className = '',
  height = '400px',
  center = { lat: 28.6139, lng: 77.2090 }, // Delhi default
  zoom = 10,
  markers = [],
  showControls = true,
  showLayerControl = true,
  userRole = 'guest',
  onMarkerClick,
  mapType = 'roadmap',
  defaultFullscreen = false,
  showHeatMap = false,
  heatPoints = []
}: GoogleMapsProps) {
  const [currentMapType, setCurrentMapType] = useState<string>(mapType);
  const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen || height === '100vh');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  // Map tile layers
  const mapLayers = {
    roadmap: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
    },
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const handleMarkerSelect = (marker: MapMarker) => {
    setSelectedMarker(marker);
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  // Ensure this component re-renders when fullscreen state changes to update the map size.
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [isFullscreen]);


  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50' : className}`}>
      <CardContent className="p-0 relative h-full">
        <div 
          style={{ height: isFullscreen ? '100vh' : height }}
          className="w-full relative overflow-hidden rounded-lg"
        >
          <MapContainer 
            // @ts-ignore - Type issues with react-leaflet
            center={[center.lat, center.lng]} 
            zoom={zoom} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <MapController center={[center.lat, center.lng]} zoom={zoom} />
            
            <TileLayer
              url={mapLayers[currentMapType as keyof typeof mapLayers]?.url || mapLayers.roadmap.url}
              // @ts-ignore - Type issues with react-leaflet
              attribution={mapLayers[currentMapType as keyof typeof mapLayers]?.attribution || mapLayers.roadmap.attribution}
            />
            
            {showHeatMap && heatPoints.length > 0 && (
              <HeatmapLayer 
                points={heatPoints} 
                radius={25}
                blur={15}
                gradient={{ 0.4: 'blue', 0.65: 'lime', 1: 'red' }}
              />
            )}

            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={[marker.lat, marker.lng]}
                // @ts-ignore - Type issues with react-leaflet
                icon={getIcon(marker.type, marker.severity)}
                eventHandlers={{
                  click: () => {
                    handleMarkerSelect(marker);
                  },
                }}
              >
                <Popup>
                  <div className="font-sans">
                    <h4 className="font-bold text-base mb-1">{marker.title}</h4>
                    <p className="text-sm text-gray-700">{marker.description}</p>
                    {marker.status && (
                      <p className="text-xs mt-2"><strong>Status:</strong> {marker.status}</p>
                    )}
                    {marker.capacity && (
                      <p className="text-xs"><strong>Capacity:</strong> {marker.capacity}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Controls */}
          {showControls && (
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
              <Button
                size="icon"
                variant="outline"
                onClick={toggleFullscreen}
                className="bg-white/90 backdrop-blur shadow-lg hover:bg-white"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </Button>
            </div>
          )}

          {/* Layer Control */}
          {showLayerControl && (
            <div className="absolute top-4 left-4 z-[1000]">
              <div className="bg-white/95 backdrop-blur rounded-lg shadow-lg p-2">
                <div className="flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant={currentMapType === 'roadmap' ? 'secondary' : 'ghost'}
                    onClick={() => setCurrentMapType('roadmap')}
                    className="justify-start"
                  >
                    <Map className="h-4 w-4 mr-2"/>
                    Roadmap
                  </Button>
                  <Button
                    size="sm"
                    variant={currentMapType === 'satellite' ? 'secondary' : 'ghost'}
                    onClick={() => setCurrentMapType('satellite')}
                    className="justify-start"
                  >
                    <Satellite className="h-4 w-4 mr-2"/>
                    Satellite
                  </Button>
                  <Button
                    size="sm"
                    variant={currentMapType === 'terrain' ? 'secondary' : 'ghost'}
                    onClick={() => setCurrentMapType('terrain')}
                    className="justify-start"
                  >
                    <Route className="h-4 w-4 mr-2"/>
                    Terrain
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default GoogleMaps;