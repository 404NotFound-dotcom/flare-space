import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Users, Phone, MapPin, Eye, LifeBuoy, 
  Search, Filter, Download
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CitizensManagement() {
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
    },
    { 
      id: 7, 
      name: "Rahul Mehta", 
      mobile: "7321098654", 
      location: "Dwarka, Delhi", 
      status: "Safe", 
      registeredDate: "2024-08-25",
      emergencyContact: "7321098653"
    },
    { 
      id: 8, 
      name: "Anita Joshi", 
      mobile: "6210987543", 
      location: "Vasant Kunj, Delhi", 
      status: "Needs Help", 
      registeredDate: "2024-09-10",
      emergencyContact: "6210987542"
    }
  ];

  const filteredCitizens = citizensData.filter(citizen =>
    citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    citizen.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAction = (action: string, userId: number, userName: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} performed for citizen: ${userName}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Data",
      description: "Citizens data exported successfully to CSV",
    });
  };

  const stats = {
    total: citizensData.length,
    safe: citizensData.filter(c => c.status === 'Safe').length,
    needsHelp: citizensData.filter(c => c.status === 'Needs Help').length,
    evacuated: citizensData.filter(c => c.status === 'Evacuated').length
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
              <h1 className="text-xl font-semibold text-gray-900">Citizens Management</h1>
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
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Citizens</p>
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
                  <p className="text-2xl font-bold">{stats.safe}</p>
                  <p className="text-sm text-gray-600">Safe</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.needsHelp}</p>
                  <p className="text-sm text-gray-600">Needs Help</p>
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
                  <p className="text-2xl font-bold">{stats.evacuated}</p>
                  <p className="text-sm text-gray-600">Evacuated</p>
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
                  placeholder="Search citizens by name or location..."
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

        {/* Citizens List */}
        <div className="grid gap-4">
          {filteredCitizens.map((citizen) => (
            <Card key={citizen.id} className="border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {getUserInitials(citizen.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{citizen.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{citizen.mobile}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{citizen.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Emergency Contact: {citizen.emergencyContact}</span>
                        <span>Registered: {new Date(citizen.registeredDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge 
                      className={
                        citizen.status === 'Safe' ? 'bg-green-100 text-green-800' :
                        citizen.status === 'Needs Help' ? 'bg-red-100 text-red-800' :
                        citizen.status === 'Evacuated' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {citizen.status}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUserAction('Contact', citizen.id, citizen.name)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUserAction('View Details', citizen.id, citizen.name)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      {citizen.status === 'Needs Help' && (
                        <Button 
                          size="sm" 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleUserAction('Send Help', citizen.id, citizen.name)}
                        >
                          <LifeBuoy className="h-4 w-4 mr-1" />
                          Send Help
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