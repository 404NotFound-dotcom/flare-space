import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, User, Edit, Save, XCircle, Crown,
  Mail, Phone, Shield, Clock, MapPin, Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function AdminProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>(null);

  useEffect(() => {
    // Load admin profile from localStorage
    const authData = localStorage.getItem("adminAuth");
    if (!authData) {
      console.log("No auth data found, redirecting to login...");
      navigate("/admin/login");
      return;
    }

    try {
      const userData = JSON.parse(authData);
      console.log("Auth data:", userData);
      
      if (!userData.isLoggedIn || userData.role !== "admin") {
        console.log("User not logged in or not admin, redirecting...");
        navigate("/admin/login");
        return;
      }

      // Set additional profile fields if not present
      const profileData = {
        ...userData,
        department: userData.department || "Emergency Management",
        location: userData.location || "Main Office, City Center",
        joinDate: userData.joinDate || "2024-01-15",
        lastLogin: userData.lastLogin || new Date().toISOString(),
        permissions: userData.permissions || ["Full Access", "User Management", "System Configuration", "Emergency Response"],
        bio: userData.bio || "Experienced emergency management administrator with expertise in disaster response coordination and resource management."
      };

      console.log("Setting profile data:", profileData);
      setUserProfile(profileData);
    } catch (error) {
      console.error("Error parsing auth data:", error);
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const handleEdit = () => {
    setEditedProfile({ ...userProfile });
    setIsEditing(true);
    toast({
      title: "Edit Mode",
      description: "You can now edit your profile information",
    });
  };

  const handleSave = () => {
    // Update the timestamp for last updated
    const updatedProfile = {
      ...editedProfile,
      lastUpdated: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem("adminAuth", JSON.stringify(updatedProfile));
    
    // Update state
    setUserProfile(updatedProfile);
    setIsEditing(false);
    setEditedProfile(null);

    toast({
      title: "Profile Updated",
      description: "Your admin profile has been successfully updated",
    });
  };

  const handleCancel = () => {
    setEditedProfile(null);
    setIsEditing(false);
    toast({
      title: "Changes Cancelled",
      description: "Your profile changes have been discarded",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Loading state
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin profile...</p>
        </div>
      </div>
    );
  }

  const currentProfile = isEditing ? editedProfile : userProfile;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-8 w-8 rounded-lg bg-orange-500/10 grid place-items-center">
                <User className="text-orange-600 h-5 w-5" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Profile</h1>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                <Crown className="h-3 w-3 mr-1" />
                Super Administrator
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button onClick={handleEdit} className="bg-orange-600 hover:bg-orange-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-32 w-32 mx-auto mb-4">
                    <AvatarFallback className="bg-orange-500 text-white text-2xl">
                      {getUserInitials(currentProfile.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {!isEditing ? (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900">{currentProfile.name}</h2>
                      <p className="text-gray-600 mb-2">{currentProfile.adminId}</p>
                      <Badge className="bg-orange-100 text-orange-800">
                        <Crown className="h-3 w-3 mr-1" />
                        Super Administrator
                      </Badge>
                    </>
                  ) : (
                    <div className="space-y-3 text-left">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={currentProfile.name || ""}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="adminId">Admin ID</Label>
                        <Input
                          id="adminId"
                          value={currentProfile.adminId || ""}
                          onChange={(e) => handleInputChange("adminId", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Email</p>
                      {!isEditing ? (
                        <p className="font-medium break-all">{currentProfile.email}</p>
                      ) : (
                        <Input
                          value={currentProfile.email || ""}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          type="email"
                          className="mt-1"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Mobile</p>
                      {!isEditing ? (
                        <p className="font-medium">{currentProfile.mobileNumber}</p>
                      ) : (
                        <Input
                          value={currentProfile.mobileNumber || ""}
                          onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                          className="mt-1"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Location</p>
                      {!isEditing ? (
                        <p className="font-medium">{currentProfile.location}</p>
                      ) : (
                        <Input
                          value={currentProfile.location || ""}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="mt-1"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Join Date</p>
                      <p className="font-medium">{new Date(currentProfile.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  {!isEditing ? (
                    <p className="mt-1 text-gray-900">{currentProfile.department}</p>
                  ) : (
                    <Input
                      id="department"
                      value={currentProfile.department || ""}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="mt-1"
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {!isEditing ? (
                    <p className="mt-1 text-gray-700">{currentProfile.bio}</p>
                  ) : (
                    <textarea
                      id="bio"
                      value={currentProfile.bio || ""}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="mt-1 w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={4}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* System Access & Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>System Access & Permissions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(currentProfile.permissions || []).map((permission: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Activity Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Last Login</p>
                    <p className="font-medium">{formatDateTime(currentProfile.lastLogin)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Registration Date</p>
                    <p className="font-medium">{formatDateTime(currentProfile.registrationTime || currentProfile.loginTime || new Date().toISOString())}</p>
                  </div>

                  {currentProfile.lastUpdated && (
                    <div>
                      <p className="text-sm text-gray-600">Profile Last Updated</p>
                      <p className="font-medium">{formatDateTime(currentProfile.lastUpdated)}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600">Account Status</p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button variant="outline" className="justify-start" onClick={() => toast({ title: "Feature Coming Soon", description: "Password change functionality will be available soon" })}>
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => toast({ title: "Feature Coming Soon", description: "Email update functionality will be available soon" })}>
                    <Mail className="h-4 w-4 mr-2" />
                    Update Email
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => toast({ title: "Feature Coming Soon", description: "Mobile update functionality will be available soon" })}>
                    <Phone className="h-4 w-4 mr-2" />
                    Update Mobile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}