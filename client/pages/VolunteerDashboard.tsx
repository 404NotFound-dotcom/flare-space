import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  LifeBuoy, MapPin, Clock, User, LogOut, Settings, CheckCircle2,
  Map as MapIcon, Users, AlertTriangle, Phone, Shield, Star,
  Navigation, Zap, Heart, Target
} from "lucide-react";
import { GoogleMaps } from "@/components/GoogleMaps";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function VolunteerDashboard() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const authData = localStorage.getItem("volunteerAuth");
    if (!authData) {
      navigate("/volunteer/login");
      return;
    }
    
    const userData = JSON.parse(authData);
    if (!userData.isLoggedIn) {
      navigate("/volunteer/login");
      return;
    }
    
    setUserProfile(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("volunteerAuth");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/volunteer/login");
  };

  const tasks = [
    { id: "1", title: "Medical Assistance Required", location: "Central Park", priority: "High", status: "Active", distance: "0.8 km" },
    { id: "2", title: "Evacuation Support", location: "Riverside Area", priority: "Medium", status: "Pending", distance: "1.2 km" },
    { id: "3", title: "Supply Distribution", location: "Community Center", priority: "Low", status: "Completed", distance: "2.1 km" },
  ];

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const acceptTask = (taskId: string) => {
    setSelectedTask(taskId);
    toast({
      title: "Accepted",
      description: "You have accepted the task. Check your assignments for details.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with User Profile */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 grid place-items-center">
                <LifeBuoy className="text-emerald-600 h-5 w-5" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Volunteer Dashboard</h1>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                Active
              </Badge>
            </div>
            
            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-emerald-500 text-white">
                    {getUserInitials(userProfile.name || "Volunteer")}
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
                  <span>Volunteer Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="bg-emerald-500 text-white text-lg">
                      {getUserInitials(userProfile.name || "Volunteer")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{userProfile.name}</h3>
                  <p className="text-sm text-gray-500">{userProfile.mobileNumber}</p>
                  <Badge className="mt-2 bg-emerald-100 text-emerald-800">{`Level 2`}</Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    <span>Profile verified</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>{`Member since: ${new Date(userProfile.registrationTime || userProfile.loginTime).toLocaleDateString()}`}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span>{`Location: Delhi, India`}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{`Rating: 4.8 (23 missions)`}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Required Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">First Aid</Badge>
                  <Badge variant="outline">Search & Rescue</Badge>
                  <Badge variant="outline">Medical Support</Badge>
                  <Badge variant="outline">Communication</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {`Emergency Number: 112`}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Command Center
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                    <div>
                      <p className="text-2xl font-bold">15</p>
                      <p className="text-sm text-gray-600">Tasks Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-gray-600">Active Tasks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-gray-600">Team Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-sm text-gray-600">Lives Helped</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map and Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Mission Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapIcon className="h-5 w-5" />
                    <span>Mission Map</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-lg overflow-hidden">
                    <GoogleMaps
                      height="calc(100vh - 200px)"
                      className="w-full"
                      center={{ lat: 28.6139, lng: 77.2090 }}
                      zoom={12}
                      mapType="terrain"
                      userRole="volunteer"
                      showControls={true}
                      showLayerControl={true}
                      defaultFullscreen={false}
                      markers={[
                        {
                          id: "task-1",
                          lat: 28.6304,
                          lng: 77.2177,
                          title: "Search & Rescue Mission",
                          type: "volunteer",
                          description: "Urgent: Search for missing persons in flood zone",
                          status: "High Priority"
                        },
                        {
                          id: "task-2",
                          lat: 28.5965,
                          lng: 77.1988,
                          title: "Medical Supply Distribution",
                          type: "volunteer",
                          description: "Distribute medical supplies to evacuation center",
                          status: "Medium Priority"
                        },
                        {
                          id: "disaster-zone",
                          lat: 28.6139,
                          lng: 77.2090,
                          title: "Active Disaster Zone",
                          type: "disaster",
                          severity: "high",
                          description: "Flood-affected area requiring immediate attention",
                          status: "Critical"
                        },
                        {
                          id: "shelter-assignment",
                          lat: 28.6517,
                          lng: 77.2219,
                          title: "Shelter Management",
                          type: "shelter",
                          description: "Help coordinate shelter operations",
                          capacity: 750,
                          status: "Support Needed"
                        },
                        {
                          id: "medical-point",
                          lat: 28.6000,
                          lng: 77.2300,
                          title: "Field Medical Station",
                          type: "hospital",
                          description: "Mobile medical unit requiring volunteers",
                          status: "Active"
                        }
                      ]}
                    />
                  </div>
                  <div className="mt-4">
                    <Button 
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition((pos) => {
                            setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                          });
                        }
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Update My Location
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Available Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LifeBuoy className="h-5 w-5" />
                    <span>Available Tasks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500">{task.location}</p>
                            <p className="text-xs text-gray-400">{task.distance} away</p>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge 
                              variant={task.priority === 'High' ? 'destructive' : 
                                      task.priority === 'Medium' ? 'default' : 'secondary'}
                            >
                              {task.priority}
                            </Badge>
                            <Badge 
                              variant={task.status === 'Completed' ? 'default' : 'outline'}
                              className={task.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : ''}
                            >
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        
                        {task.status !== 'Completed' && (
                          <Button 
                            size="sm" 
                            className="w-full bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => acceptTask(task.id)}
                            disabled={selectedTask === task.id}
                          >
                            {selectedTask === task.id ? 'Accepted' : 'Accept Task'}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Communication */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Team Communication</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Updates</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Team Alpha deployed to Central Park</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Medical supplies restocked</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Weather update: Rain expected</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full justify-start bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => navigate("/volunteer/team")}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Create Team
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Team Leader
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Report Emergency
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <MapPin className="h-4 w-4 mr-2" />
                        Share Location
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}