import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Building2, MapPin, Eye, Users, 
  Search, Filter, Download, Phone, Shield
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SheltersManagement() {
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

  // Mock shelter data
  const sheltersData = [
    { 
      id: 1, 
      name: "Central Community School", 
      location: "Sector 15, Noida", 
      capacity: 500,
      currentOccupancy: 120,
      status: "Active",
      facilities: ["Food", "Medical", "Security", "Communication"],
      contactPerson: "Principal Sharma",
      contactNumber: "9876543210",
      type: "School"
    },
    { 
      id: 2, 
      name: "Indira Gandhi Stadium", 
      location: "Connaught Place, Delhi", 
      capacity: 2000,
      currentOccupancy: 1850,
      status: "Near Full",
      facilities: ["Food", "Medical", "Security", "Restrooms"],
      contactPerson: "Manager Raj Kumar",
      contactNumber: "8765432109",
      type: "Stadium"
    },
    { 
      id: 3, 
      name: "District Hospital Annexe", 
      location: "Civil Lines, Delhi", 
      capacity: 300,
      currentOccupancy: 45,
      status: "Active",
      facilities: ["Medical", "Food", "Security"],
      contactPerson: "Dr. Priya Singh",
      contactNumber: "7654321098",
      type: "Hospital"
    },
    { 
      id: 4, 
      name: "St. Mary's Church Hall", 
      location: "Karol Bagh, Delhi", 
      capacity: 200,
      currentOccupancy: 0,
      status: "Available",
      facilities: ["Food", "Restrooms", "Communication"],
      contactPerson: "Father Thomas",
      contactNumber: "6543210987",
      type: "Religious"
    },
    { 
      id: 5, 
      name: "Government Girls College", 
      location: "Lajpat Nagar, Delhi", 
      capacity: 800,
      currentOccupancy: 600,
      status: "Active",
      facilities: ["Food", "Medical", "Security", "Education"],
      contactPerson: "Dean Dr. Meera",
      contactNumber: "9543210876",
      type: "College"
    },
    { 
      id: 6, 
      name: "Community Center Dwarka", 
      location: "Sector 10, Dwarka", 
      capacity: 400,
      currentOccupancy: 0,
      status: "Closed",
      facilities: ["Food", "Security", "Communication"],
      contactPerson: "Officer Vikram",
      contactNumber: "8432109765",
      type: "Community Center"
    }
  ];

  const filteredShelters = sheltersData.filter(shelter =>
    shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shelter.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShelterAction = (action: string, shelterId: number, shelterName: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} performed for shelter: ${shelterName}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Data",
      description: "Shelters data exported successfully to CSV",
    });
  };

  const getOccupancyPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Near Full': return 'bg-yellow-100 text-yellow-800';
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: sheltersData.length,
    active: sheltersData.filter(s => s.status === 'Active').length,
    available: sheltersData.filter(s => s.status === 'Available').length,
    totalCapacity: sheltersData.reduce((sum, s) => sum + s.capacity, 0),
    totalOccupancy: sheltersData.reduce((sum, s) => sum + s.currentOccupancy, 0)
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
              <h1 className="text-xl font-semibold text-gray-900">Shelters Management</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Shelters</p>
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
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.available}</p>
                  <p className="text-sm text-gray-600">Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalCapacity.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Capacity</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-indigo-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalOccupancy.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Current Occupancy</p>
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
                  placeholder="Search shelters by name or location..."
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

        {/* Shelters List */}
        <div className="grid gap-4">
          {filteredShelters.map((shelter) => (
            <Card key={shelter.id} className="border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-8 w-8 text-purple-500" />
                      <div>
                        <h3 className="font-semibold text-lg">{shelter.name}</h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{shelter.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <p className="font-medium">{shelter.type}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Capacity:</span>
                        <p className="font-medium">{shelter.capacity} people</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Occupancy:</span>
                        <p className="font-medium">{shelter.currentOccupancy} / {shelter.capacity}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${getOccupancyPercentage(shelter.currentOccupancy, shelter.capacity)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Contact:</span>
                        <p className="font-medium">{shelter.contactPerson}</p>
                        <p className="text-xs text-gray-500">{shelter.contactNumber}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 text-sm">Facilities:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {shelter.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-3">
                    <Badge className={getStatusColor(shelter.status)}>
                      {shelter.status}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleShelterAction('Contact', shelter.id, shelter.name)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleShelterAction('View Details', shelter.id, shelter.name)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      {shelter.status === 'Available' && (
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleShelterAction('Activate', shelter.id, shelter.name)}
                        >
                          <Shield className="h-4 w-4 mr-1" />
                          Activate
                        </Button>
                      )}
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