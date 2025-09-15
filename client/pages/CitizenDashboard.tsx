import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Siren, AlertTriangle, Home, Map as MapIcon, LifeBuoy,
  Search, Bell, Phone, Layers, User, LogOut, Settings,
  Shield, MapPin, Clock, Heart, Download, DollarSign,
  Package
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { GoogleMaps } from "@/components/GoogleMaps";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function CitizenDashboard() {
  const [layers, setLayers] = useState({ risk: true, shelters: true, services: true });
  const [exclusiveLayerMode, setExclusiveLayerMode] = useState(false);
  const [online, setOnline] = useState(true);
  const [showHeat, setShowHeat] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [route, setRoute] = useState<{ lat: number; lng: number }[] | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user is logged in
    const authData = localStorage.getItem("citizenAuth");
    if (!authData) {
      navigate("/citizen/login");
      return;
    }
    
    const userData = JSON.parse(authData);
    if (!userData.isLoggedIn) {
      navigate("/citizen/login");
      return;
    }
    
    setUserProfile(userData);
  }, [navigate]);

  useEffect(() => {
    const set = () => setOnline(navigator.onLine);
    set();
    window.addEventListener("online", set);
    window.addEventListener("offline", set);
    return () => {
      window.removeEventListener("online", set);
      window.removeEventListener("offline", set);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("citizenAuth");
    toast({
      title: t("logout.title"),
      description: t("logout.description"),
    });
    navigate("/citizen/login");
  };

  const pinsData = [
    { lat: 28.60, lng: 77.22, type: "risk" as const, name: "Flooded Road", status: "High" },
    { lat: 28.62, lng: 77.21, type: "shelter" as const, name: "Central School Shelter", status: "Open", contact: "555-0111" },
    { lat: 28.64, lng: 77.19, type: "service" as const, name: "Medical Camp", status: "Active", contact: "555-0222" },
    { lat: 28.59, lng: 77.23, type: "shelter" as const, name: "Community Hall Shelter", status: "Open", contact: "555-0333" },
    { lat: 28.61, lng: 77.24, type: "risk" as const, name: "Bridge Closed", status: "Blocked" },
    { lat: 28.63, lng: 77.23, type: "risk" as const, name: "Building Collapse Risk", status: "High" },
    { lat: 28.615, lng: 77.22, type: "risk" as const, name: "Power Line Down", status: "Medium" },
  ];

  const heatPoints = useMemo(() => (
    layers.risk ? pinsData
      .filter(p => p.type === "risk")
      .map(p => ({ lat: p.lat, lng: p.lng, intensity: p.status === "High" ? 1 : 0.8 }))
    : []
  ), [layers.risk]);

  const locateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  const haversine = (a: {lat:number;lng:number}, b: {lat:number;lng:number}) => {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLon = (b.lng - a.lng) * Math.PI / 180;
    const a1 = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));
    return R * c;
  };

  const nearestShelter = useMemo(() => {
    if (!userLocation) return null;
    const shelters = pinsData.filter(p => p.type === "shelter");
    return shelters.reduce((nearest, shelter) => {
      const distance = haversine(userLocation, shelter);
      return !nearest || distance < haversine(userLocation, nearest) ? shelter : nearest;
    }, null as any);
  }, [userLocation]);

  if (!userProfile) {
    return <div>{t("common.loading")}</div>;
  }

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with User Profile */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">{t("citizen.dashboard.title")}</h1>
              {!online && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                  {t("common.offlineMode")}
                </span>
              )}
            </div>
            
            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-500 text-white">
                    {getUserInitials(userProfile.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                  <p className="text-xs text-gray-500">{userProfile.mobileNumber}</p>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar with Profile Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{t("profile.title")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="bg-blue-500 text-white text-lg">
                      {getUserInitials(userProfile.name || t("common.user"))}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{userProfile.name}</h3>
                  <p className="text-sm text-gray-500">{userProfile.mobileNumber}</p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/citizen/profile")}
                  variant="outline"
                >
                  <User className="h-4 w-4 mr-2" /> {t("profile.viewUpdate")}
                </Button>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>{t("profile.verifiedCitizen")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>{t("profile.memberSince", { date: new Date(userProfile.registrationTime || userProfile.loginTime).toLocaleDateString() })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span>{t("profile.location", { location: "Delhi, India" })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donations Card */}
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span>{t("donations.title") || "Donations"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">
                  {t("donations.sidebar.description") || "Support disaster relief efforts with monetary or in-kind donations."}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col items-center p-2 bg-white rounded-md shadow-sm border border-red-100">
                    <DollarSign className="h-6 w-6 text-green-600 mb-1" />
                    <p className="text-xs font-medium text-center">{t("donations.sidebar.money") || "Money"}</p>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-white rounded-md shadow-sm border border-red-100">
                    <Package className="h-6 w-6 text-blue-600 mb-1" />
                    <p className="text-xs font-medium text-center">{t("donations.sidebar.supplies") || "Supplies"}</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white" 
                  onClick={() => navigate("/citizen/donations")}
                >
                  <Heart className="h-4 w-4 mr-2" /> 
                  {t("donations.sidebar.donateNow") || "Donate Now"}
                </Button>
              </CardContent>
            </Card>
            
            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>{t("emergency.title")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Siren className="h-4 w-4 mr-2" />
                  {t("emergency.mainNumber", { number: "112" })}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <LifeBuoy className="h-4 w-4 mr-2" />
                  {t("emergency.disasterHelp", { number: "1078" })}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-gray-600">{t("dashboard.activeAlerts")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Home className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-gray-600">{t("dashboard.openShelters")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <LifeBuoy className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-gray-600">{t("dashboard.activeServices")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map and Controls */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <CardTitle className="flex items-center space-x-2">
                    <MapIcon className="h-5 w-5" />
                    <span>{t("map.title")}</span>
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button onClick={locateMe} size="sm" variant="outline">
                      <Search className="h-4 w-4 mr-1" />
                      {t("map.locateMe")}
                    </Button>
                    <Button 
                      onClick={() => setShowHeat(!showHeat)} 
                      size="sm" 
                      variant={showHeat ? "default" : "outline"}
                    >
                      <Layers className="h-4 w-4 mr-1" />
                      {t("map.heatMap")}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-lg overflow-hidden">
                  <GoogleMaps
                    height="calc(100vh - 200px)"
                    className="w-full"
                    center={{ lat: 28.6139, lng: 77.2090 }}
                    zoom={12}
                    mapType="roadmap"
                    userRole="citizen"
                    showControls={true}
                    showLayerControl={true}
                    defaultFullscreen={false}
                    showHeatMap={showHeat && layers.risk}
                    heatPoints={heatPoints}
                    markers={[
                      ...(layers.shelters ? [
                        {
                          id: "shelter1",
                          lat: 28.6304,
                          lng: 77.2177,
                          title: "Emergency Shelter - Central Delhi",
                          type: "shelter" as const,
                          description: "Safe shelter with food and medical aid",
                          capacity: 500,
                          status: "Available"
                        },
                        {
                          id: "shelter2",
                          lat: 28.5850,
                          lng: 77.2300,
                          title: "South Delhi Shelter",
                          type: "shelter" as const,
                          description: "Community shelter with basic amenities",
                          capacity: 350,
                          status: "Available"
                        }
                      ] : []),
                      ...(layers.risk ? [
                        {
                          id: "disaster1",
                          lat: 28.6139,
                          lng: 77.2090,
                          title: "Flood Zone Alert",
                          type: "disaster" as const,
                          severity: "high" as const,
                          description: "Severe flooding reported in this area",
                          status: "Active"
                        },
                        {
                          id: "disaster2",
                          lat: 28.6250,
                          lng: 77.2050,
                          title: "Building Damage",
                          type: "disaster" as const,
                          severity: "medium" as const,
                          description: "Structural damage to buildings",
                          status: "Active"
                        }
                      ] : []),
                      ...(layers.services ? [
                        {
                          id: "hospital1",
                          lat: 28.5965,
                          lng: 77.1988,
                          title: "Medical Emergency Center",
                          type: "hospital" as const,
                          description: "24/7 emergency medical services",
                          status: "Operational"
                        },
                        {
                          id: "hospital2",
                          lat: 28.6100,
                          lng: 77.2320,
                          title: "Field Medical Camp",
                          type: "hospital" as const,
                          description: "First aid and basic medical services",
                          status: "Operational"
                        }
                      ] : [])
                    ]}
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className={exclusiveLayerMode ? "bg-amber-100 text-amber-800 border-amber-300" : ""}
                        onClick={() => setExclusiveLayerMode(!exclusiveLayerMode)}
                      >
                        <Layers className="h-4 w-4 mr-2" />
                        {exclusiveLayerMode ? t("map.showingSingleLayer") : t("map.showingMultipleLayers")}
                      </Button>
                    </div>
                    
                    {exclusiveLayerMode && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setLayers({ risk: true, shelters: true, services: true })}
                      >
                        {t("map.showAll")}
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                  {Object.entries(layers).map(([key, enabled]) => (
                    <Button
                      key={key}
                      size="sm"
                      variant={enabled ? "default" : "outline"}
                      onClick={() => {
                        if (exclusiveLayerMode) {
                          // If in exclusive mode, enable only the clicked layer
                          setLayers({
                            risk: key === 'risk',
                            shelters: key === 'shelters',
                            services: key === 'services'
                          });
                        } else {
                          // Regular toggle behavior
                          setLayers(prev => ({ ...prev, [key]: !enabled }));
                        }
                      }}
                      title={exclusiveLayerMode ? t("map.showOnly", { layer: t(`map.layers.${key}`) }) : t("map.toggleLayer", { layer: t(`map.layers.${key}`) })}
                      className={
                        enabled
                          ? key === 'risk' 
                            ? "bg-red-600 hover:bg-red-700 text-white" 
                            : key === 'shelters' 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : key === 'services' 
                            ? "bg-blue-600 hover:bg-blue-700 text-white" 
                            : ""
                          : key === 'risk' 
                            ? "text-red-600 hover:bg-red-100 border-red-600" 
                            : key === 'shelters' 
                            ? "text-green-600 hover:bg-green-100 border-green-600" 
                            : key === 'services' 
                            ? "text-blue-600 hover:bg-blue-100 border-blue-600" 
                            : ""
                      }
                    >
                      {key === 'risk' && <AlertTriangle className={`h-4 w-4 mr-1 ${enabled ? "text-white" : "text-red-600"}`} />}
                      {key === 'shelters' && <Home className={`h-4 w-4 mr-1 ${enabled ? "text-white" : "text-green-600"}`} />}
                      {key === 'services' && <LifeBuoy className={`h-4 w-4 mr-1 ${enabled ? "text-white" : "text-blue-600"}`} />}
                      {exclusiveLayerMode && Object.values(layers).filter(v => v).length === 1 && enabled 
                        ? t("map.onlyLayer", { layer: t(`map.layers.${key}`) })
                        : t(`map.layers.${key}`)}
                    </Button>
                  ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions and Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.quickActions")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Siren className="h-4 w-4 mr-2" />
                      {t("actions.reportEmergency")}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      {t("actions.viewAlerts")}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      {t("actions.findShelter")}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/citizen/donations")}
                    >
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      {t("donations.sidebar.donateNow") || "Donate Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{t("activity.loggedIn")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{t("activity.locationEnabled")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>{t("activity.preferencesUpdated")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}