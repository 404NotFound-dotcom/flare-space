import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, User, MapPin, Phone, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export default function CitizenProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    emergencyContact: "",
    bloodGroup: "",
    allergies: "",
    medicalConditions: ""
  });

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
    
    // Pre-fill the form with existing data
    setFormData({
      ...formData,
      name: userData.name || "",
      mobileNumber: userData.mobileNumber || "",
      email: userData.email || "",
      address: userData.address || "",
      city: userData.city || "",
      state: userData.state || "",
      pincode: userData.pincode || "",
      emergencyContact: userData.emergencyContact || "",
      bloodGroup: userData.bloodGroup || "",
      allergies: userData.allergies || "",
      medicalConditions: userData.medicalConditions || ""
    });
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // In a real app, you would send this data to an API
    setTimeout(() => {
      const authData = localStorage.getItem("citizenAuth");
      if (authData) {
        const userData = JSON.parse(authData);
        const updatedUser = { ...userData, ...formData };
        localStorage.setItem("citizenAuth", JSON.stringify(updatedUser));
        
        toast({
          title: t("profile.updateSuccess.title"),
          description: t("profile.updateSuccess.description"),
        });
        setIsEditing(false);
        setLoading(false);
      }
    }, 1000);
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/citizen/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("navigation.backToDashboard")}
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">{t("profile.myProfile")}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Profile Summary Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-blue-500 text-white text-xl">
                    {getUserInitials(formData.name || t("common.user"))}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h2 className="text-2xl font-bold">{formData.name}</h2>
                    <p className="text-gray-500 flex items-center justify-center md:justify-start">
                      <Phone className="h-4 w-4 mr-1" />
                      {formData.mobileNumber}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      {t("profile.verifiedCitizen")}
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {t("profile.activeMember")}
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                >
                  {isEditing ? t("profile.cancelEditing") : t("profile.editProfile")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Form */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {t("profile.personalInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("profile.fields.fullName")}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("profile.placeholders.fullName")}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">{t("profile.fields.mobileNumber")}</Label>
                    <Input
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder={t("profile.placeholders.mobileNumber")}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("profile.fields.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("profile.placeholders.email")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">{t("profile.fields.emergencyContact")}</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder={t("profile.placeholders.emergencyContact")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <CardTitle className="flex items-center text-lg mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    {t("profile.addressInfo")}
                  </CardTitle>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">{t("profile.fields.streetAddress")}</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder={t("profile.placeholders.streetAddress")}
                        disabled={!isEditing}
                        rows={2}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">{t("profile.fields.city")}</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder={t("profile.placeholders.city")}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">{t("profile.fields.state")}</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder={t("profile.placeholders.state")}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">{t("profile.fields.pincode")}</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder={t("profile.placeholders.pincode")}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <CardTitle className="flex items-center text-lg mb-4">
                    <Shield className="h-5 w-5 mr-2" />
                    {t("profile.medicalInfo")}
                  </CardTitle>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">{t("profile.fields.bloodGroup")}</Label>
                        <Input
                          id="bloodGroup"
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          placeholder={t("profile.placeholders.bloodGroup")}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="allergies">{t("profile.fields.allergies")}</Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        placeholder={t("profile.placeholders.allergies")}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions">{t("profile.fields.medicalConditions")}</Label>
                      <Textarea
                        id="medicalConditions"
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleInputChange}
                        placeholder={t("profile.placeholders.medicalConditions")}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                      {loading ? t("common.saving") : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {t("profile.save")}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}