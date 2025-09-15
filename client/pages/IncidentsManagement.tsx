import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, AlertTriangle, MapPin, Eye, Clock, 
  Search, Filter, Download, Phone, LifeBuoy
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function IncidentsManagement() {
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

  // Mock incident data
  const incidentsData = [
    { 
      id: 1, 
      title: "Severe Flooding in Sector 15", 
      location: "Sector 15, Noida", 
      severity: "High",
      status: "Active",
      reportedTime: "2024-09-14T10:30:00",
      reportedBy: "Citizen Alert System",
      assignedTeam: "Team Alpha",
      affectedPeople: 150,
      description: "Heavy rainfall causing severe waterlogging and flooding in residential areas"
    },
    { 
      id: 2, 
      title: "Building Collapse Risk", 
      location: "Connaught Place, Delhi", 
      severity: "Critical",
      status: "Active",
      reportedTime: "2024-09-14T14:15:00",
      reportedBy: "Safety Inspector",
      assignedTeam: "Structural Assessment Team",
      affectedPeople: 200,
      description: "Old building showing structural damage after heavy rains"
    },
    { 
      id: 3, 
      title: "Power Outage - Multiple Areas", 
      location: "Gurgaon Sector 22-25", 
      severity: "Medium",
      status: "In Progress",
      reportedTime: "2024-09-14T16:45:00",
      reportedBy: "Power Grid Monitor",
      assignedTeam: "Electrical Response Unit",
      affectedPeople: 5000,
      description: "Widespread power failure affecting multiple residential sectors"
    },
    { 
      id: 4, 
      title: "Road Blockage - Fallen Trees", 
      location: "Karol Bagh Main Road", 
      severity: "Medium",
      status: "Resolved",
      reportedTime: "2024-09-14T12:20:00",
      reportedBy: "Traffic Police",
      assignedTeam: "Road Clearance Team",
      affectedPeople: 1000,
      description: "Multiple trees fallen on main road blocking traffic"
    },
    { 
      id: 5, 
      title: "Water Contamination Alert", 
      location: "Dwarka Sector 10", 
      severity: "High",
      status: "Active",
      reportedTime: "2024-09-14T11:00:00",
      reportedBy: "Health Department",
      assignedTeam: "Water Quality Team",
      affectedPeople: 3000,
      description: "Contaminated water supply detected in residential area"
    },
    { 
      id: 6, 
      title: "Gas Leak Emergency", 
      location: "Lajpat Nagar Market", 
      severity: "Critical",
      status: "Resolved",
      reportedTime: "2024-09-14T09:15:00",
      reportedBy: "Gas Company",
      assignedTeam: "Hazmat Team",
      affectedPeople: 500,
      description: "Gas pipeline leak in commercial area, area evacuated safely"
    }
  ];

  const filteredIncidents = incidentsData.filter(incident =>
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIncidentAction = (action: string, incidentId: number, incidentTitle: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} performed for incident: ${incidentTitle}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Data",
      description: "Incidents data exported successfully to CSV",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const reportTime = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - reportTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours === 1) return '1 hour ago';
    return `${diffInHours} hours ago`;
  };

  const stats = {
    total: incidentsData.length,
    active: incidentsData.filter(i => i.status === 'Active').length,
    inProgress: incidentsData.filter(i => i.status === 'In Progress').length,
    resolved: incidentsData.filter(i => i.status === 'Resolved').length,
    critical: incidentsData.filter(i => i.severity === 'Critical').length
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
              <h1 className="text-xl font-semibold text-gray-900">Incidents Management</h1>
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
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Incidents</p>
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
                  <p className="text-2xl font-bold">{stats.inProgress}</p>
                  <p className="text-sm text-gray-600">In Progress</p>
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
                  <p className="text-2xl font-bold">{stats.resolved}</p>
                  <p className="text-sm text-gray-600">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.critical}</p>
                  <p className="text-sm text-gray-600">Critical</p>
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
                  placeholder="Search incidents by title or location..."
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

        {/* Incidents List */}
        <div className="grid gap-4">
          {filteredIncidents.map((incident) => (
            <Card key={incident.id} className="border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className={`h-8 w-8 ${
                        incident.severity === 'Critical' ? 'text-red-500' :
                        incident.severity === 'High' ? 'text-orange-500' :
                        incident.severity === 'Medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-lg">{incident.title}</h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{incident.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Reported:</span>
                        <p className="font-medium">{getTimeAgo(incident.reportedTime)}</p>
                        <p className="text-xs text-gray-500">{incident.reportedBy}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Assigned Team:</span>
                        <p className="font-medium">{incident.assignedTeam}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Affected People:</span>
                        <p className="font-medium">{incident.affectedPeople.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 text-sm">Description:</span>
                      <p className="text-sm mt-1">{incident.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-3">
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleIncidentAction('Contact Team', incident.id, incident.title)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleIncidentAction('View Details', incident.id, incident.title)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      {incident.status === 'Active' && (
                        <Button 
                          size="sm" 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleIncidentAction('Deploy Response', incident.id, incident.title)}
                        >
                          <LifeBuoy className="h-4 w-4 mr-1" />
                          Respond
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