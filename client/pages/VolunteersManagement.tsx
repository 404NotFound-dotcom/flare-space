import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, LifeBuoy, Phone, MapPin, Eye, 
  Search, Filter, Download, Calendar, Award
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function VolunteersManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if admin is logged in
    const authData = localStorage.getItem("adminAuth");
    if (!authData) {
      navigate("/admin/login");
      return;
    }
  }, [navigate]);

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Mock volunteer data
  const volunteersData = [
    { 
      id: 1, 
      name: "Captain Arjun Nair", 
      mobile: "9876543210", 
      location: "Central Command, Delhi", 
      status: "On Duty", 
      specialization: "Search & Rescue",
      experience: "5 years",
      missionsCompleted: 23,
      currentAssignment: "Flood Response Team Alpha"
    },
    { 
      id: 2, 
      name: "Dr. Meera Kapoor", 
      mobile: "8765432109", 
      location: "Medical Unit, AIIMS", 
      status: "On Duty", 
      specialization: "Emergency Medical",
      experience: "8 years",
      missionsCompleted: 45,
      currentAssignment: "Mobile Medical Unit 1"
    },
    { 
      id: 3, 
      name: "Engineer Rohit Shah", 
      mobile: "7654321098", 
      location: "Technical Support, Noida", 
      status: "Standby", 
      specialization: "Infrastructure",
      experience: "3 years",
      missionsCompleted: 12,
      currentAssignment: "Infrastructure Assessment Team"
    },
    { 
      id: 4, 
      name: "Inspector Kavya Singh", 
      mobile: "6543210987", 
      location: "Coordination Center, Gurgaon", 
      status: "On Duty", 
      specialization: "Coordination & Logistics",
      experience: "6 years",
      missionsCompleted: 38,
      currentAssignment: "Resource Distribution Lead"
    },
    { 
      id: 5, 
      name: "Firefighter Raj Malhotra", 
      mobile: "9543210876", 
      location: "Fire Station 12, Delhi", 
      status: "On Duty", 
      specialization: "Fire & Safety",
      experience: "7 years",
      missionsCompleted: 52,
      currentAssignment: "Emergency Response Unit"
    },
    { 
      id: 6, 
      name: "Counselor Priya Reddy", 
      mobile: "8432109765", 
      location: "Relief Center, Dwarka", 
      status: "Standby", 
      specialization: "Psychological Support",
      experience: "4 years",
      missionsCompleted: 28,
      currentAssignment: "Victim Support Team"
    }
  ];

  const filteredVolunteers = volunteersData.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVolunteerAction = (action: string, volunteerId: number, volunteerName: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} performed for volunteer: ${volunteerName}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Data",
      description: "Volunteers data exported successfully to CSV",
    });
  };

  const stats = {
    total: volunteersData.length,
    onDuty: volunteersData.filter(v => v.status === 'On Duty').length,
    standby: volunteersData.filter(v => v.status === 'Standby').length,
    totalMissions: volunteersData.reduce((sum, v) => sum + v.missionsCompleted, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Volunteers Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <LifeBuoy className="h-8 w-8 text-emerald-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Volunteers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.onDuty}</p>
                  <p className="text-sm text-gray-600">On Duty</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.standby}</p>
                  <p className="text-sm text-gray-600">Standby</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalMissions}</p>
                  <p className="text-sm text-gray-600">Total Missions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search volunteers by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Volunteers List */}
        <div className="grid gap-4">
          {filteredVolunteers.map((volunteer) => (
            <Card key={volunteer.id} className="border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-emerald-500 text-white">
                        {getUserInitials(volunteer.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{volunteer.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{volunteer.mobile}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{volunteer.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Specialization: {volunteer.specialization}</span>
                        <span>Experience: {volunteer.experience}</span>
                        <span>Missions: {volunteer.missionsCompleted}</span>
                      </div>
                      <div className="text-sm text-blue-600">
                        Current Assignment: {volunteer.currentAssignment}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge 
                      className={
                        volunteer.status === 'On Duty' ? 'bg-green-100 text-green-800' :
                        volunteer.status === 'Standby' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {volunteer.status}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleVolunteerAction('Contact', volunteer.id, volunteer.name)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleVolunteerAction('View Profile', volunteer.id, volunteer.name)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Profile
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleVolunteerAction('Assign Mission', volunteer.id, volunteer.name)}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Assign
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}