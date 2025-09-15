import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Shield, LogOut, Settings, Users, AlertTriangle, 
  LifeBuoy, Building2, Phone, Mail, Crown, Activity,
  BarChart3, MapPin, CheckCircle2, XCircle, 
  Zap, Database, User
} from "lucide-react";
import { GoogleMaps } from "@/components/GoogleMaps";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const authData = localStorage.getItem("adminAuth");
    if (!authData) {
      navigate("/admin/login");
      return;
    }
    
    const userData = JSON.parse(authData);
    if (!userData.isLoggedIn || userData.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    
    setUserProfile(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/admin/login");
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Settings panel would open here",
    });
  };

  const handleCreateAlert = () => {
    toast({
      title: "Emergency Alert System",
      description: "Alert broadcast system activated - notifications sent to all users",
    });
  };

  const handleManageUsers = () => {
    navigate("/admin/citizens");
  };

  const handleAdminProfile = () => {
    navigate("/admin/profile");
  };

  const handleViewReports = () => {
    toast({
      title: "Analytics Dashboard",
      description: "Loading comprehensive reports and system analytics",
    });
  };

  const handleResourceManagement = (resource: string) => {
    switch (resource) {
      case "Citizens":
        navigate("/admin/citizens");
        break;
      case "Volunteers":
        navigate("/admin/volunteers");
        break;
      case "Shelters":
        navigate("/admin/shelters");
        break;
      case "Incidents":
        navigate("/admin/incidents");
        break;
      default:
        toast({
          title: `${resource} Management`,
          description: `${resource} management panel activated`,
        });
    }
  };

  const handleSystemOperation = (operation: string) => {
    switch (operation) {
      case "Analytics":
        navigate("/admin/analytics");
        break;
      case "Settings":
        navigate("/admin/settings");
        break;
      case "Monitoring":
        navigate("/admin/monitoring");
        break;
      case "Backup":
        navigate("/admin/backup");
        break;
      default:
        toast({
          title: operation,
          description: `${operation} system activated`,
        });
    }
  };

  const handleStatsClick = (statType: string) => {
    const messages = {
      "users": "Total registered citizens: 1,248 (Citizens: 1,089, Volunteers: 87, Admins: 72)",
      "incidents": "Active incidents: 12 (High: 3, Medium: 5, Low: 4)",
      "volunteers": "Active volunteers: 87 (Field: 52, Standby: 25, Training: 10)"
    };
    
    toast({
      title: "Detailed Statistics",
      description: messages[statType as keyof typeof messages] || "Loading detailed statistics...",
    });
  };

  const handleUserAction = (action: string, userId: number, userName: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} performed for citizen: ${userName}`,
    });
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Mock data for dashboard
  const stats = {
    totalCitizens: 1248,
    activeIncidents: 12,
    volunteers: 87,
    sheltersOpen: 15,
    responseTime: "3.2 min",
    systemUptime: "99.9%"
  };

  // Mock citizen data
  const citizensData = [
    { 
      id: 1, 
      name: "Rajesh Kumar", 
      mobile: "9876543210", 
      location: "Sector 15, Noida", 
      status: "Safe", 
      registeredDate: "2024-08-15",
      emergencyContact: "9876543211"
    },
    { 
      id: 2, 
      name: "Priya Sharma", 
      mobile: "8765432109", 
      location: "Connaught Place, Delhi", 
      status: "Safe", 
      registeredDate: "2024-09-01",
      emergencyContact: "8765432108"
    },
    { 
      id: 3, 
      name: "Amit Singh", 
      mobile: "7654321098", 
      location: "Sector 22, Gurgaon", 
      status: "Needs Help", 
      registeredDate: "2024-07-20",
      emergencyContact: "7654321097"
    },
    { 
      id: 4, 
      name: "Sneha Patel", 
      mobile: "6543210987", 
      location: "CP Block, Pitampura", 
      status: "Safe", 
      registeredDate: "2024-08-30",
      emergencyContact: "6543210986"
    },
    { 
      id: 5, 
      name: "Vikram Gupta", 
      mobile: "9543210876", 
      location: "Lajpat Nagar, Delhi", 
      status: "Evacuated", 
      registeredDate: "2024-06-10",
      emergencyContact: "9543210875"
    },
    { 
      id: 6, 
      name: "Kavita Verma", 
      mobile: "8432109765", 
      location: "Karol Bagh, Delhi", 
      status: "Safe", 
      registeredDate: "2024-09-05",
      emergencyContact: "8432109764"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with User Profile */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-orange-500/10 grid place-items-center">
                <Shield className="text-orange-600 h-5 w-5" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Control Center</h1>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                <Crown className="h-3 w-3 mr-1" />
                Super Admin
              </Badge>
            </div>
            
            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-orange-500 text-white">
                    {getUserInitials(userProfile.name || "Admin")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                  <p className="text-xs text-gray-500">{userProfile.adminId}</p>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleSettings}>
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
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Status</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Uptime</span>
                  <span className="text-sm font-medium">{stats.systemUptime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleAdminProfile}>
                  <User className="h-4 w-4 mr-2" />
                  Admin Profile
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleCreateAlert}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleManageUsers}>
                  <Users className="h-4 w-4 mr-2" />
                  Manage Citizens
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleViewReports}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatsClick("users")}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalCitizens.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Citizens</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatsClick("incidents")}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.activeIncidents}</p>
                      <p className="text-sm text-gray-600">Active Incidents</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatsClick("volunteers")}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <LifeBuoy className="h-8 w-8 text-emerald-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.volunteers}</p>
                      <p className="text-sm text-gray-600">Active Volunteers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Resource Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="justify-start" onClick={() => handleResourceManagement("Citizens")}>
                      <Users className="h-4 w-4 mr-2" />
                      Citizens
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start" onClick={() => handleResourceManagement("Volunteers")}>
                      <LifeBuoy className="h-4 w-4 mr-2" />
                      Volunteers
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start" onClick={() => handleResourceManagement("Shelters")}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Shelters
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start" onClick={() => handleResourceManagement("Incidents")}>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Incidents
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>System Operations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="justify-start" onClick={() => handleSystemOperation("Analytics")}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start" onClick={() => handleSystemOperation("Settings")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start" onClick={() => handleSystemOperation("Monitoring")}>
                      <Activity className="h-4 w-4 mr-2" />
                      Monitoring
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start" onClick={() => handleSystemOperation("Backup")}>
                      <Database className="h-4 w-4 mr-2" />
                      Backup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Command Center Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Command Center - Live Situational Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <GoogleMaps
                  height="calc(100vh - 200px)"
                  className="w-full rounded-lg overflow-hidden"
                  center={{ lat: 28.6139, lng: 77.2090 }}
                  zoom={10}
                  mapType="satellite"
                  userRole="admin"
                  showControls={true}
                  showLayerControl={true}
                  defaultFullscreen={false}
                  markers={[
                    {
                      id: "command-center",
                      lat: 28.6139,
                      lng: 77.2090,
                      title: "Central Command Center",
                      type: "admin",
                      description: "Main administrative control center",
                      status: "Operational"
                    },
                    {
                      id: "disaster-high-1",
                      lat: 28.6304,
                      lng: 77.2177,
                      title: "Critical Flood Zone",
                      type: "disaster",
                      severity: "high",
                      description: "Severe flooding with immediate evacuation needed",
                      status: "Critical"
                    },
                    {
                      id: "disaster-medium-1",
                      lat: 28.5965,
                      lng: 77.1988,
                      title: "Storm Warning Area",
                      type: "disaster",
                      severity: "medium",
                      description: "Heavy rainfall and wind warnings",
                      status: "Active"
                    },
                    {
                      id: "shelter-1",
                      lat: 28.6517,
                      lng: 77.2219,
                      title: "Primary Emergency Shelter",
                      type: "shelter",
                      description: "Main evacuation center with full facilities",
                      capacity: 1000,
                      status: "Available"
                    },
                    {
                      id: "shelter-2",
                      lat: 28.5810,
                      lng: 77.2090,
                      title: "Secondary Relief Center",
                      type: "shelter",
                      description: "Additional shelter with medical facilities",
                      capacity: 500,
                      status: "Available"
                    },
                    {
                      id: "hospital-1",
                      lat: 28.6200,
                      lng: 77.1900,
                      title: "Emergency Medical Hub",
                      type: "hospital",
                      description: "Central medical facility for disaster response",
                      status: "Operational"
                    },
                    {
                      id: "volunteer-1",
                      lat: 28.6000,
                      lng: 77.2300,
                      title: "Volunteer Coordination Point",
                      type: "volunteer",
                      description: "Main volunteer assembly and dispatch center",
                      status: "Active"
                    },
                    {
                      id: "resource-1",
                      lat: 28.6400,
                      lng: 77.1800,
                      title: "Resource Distribution Center",
                      type: "resource",
                      description: "Central hub for supplies and equipment",
                      status: "Operational"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


    </div>
  );
}