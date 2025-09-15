import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft, Settings, Shield, Bell, Database,
  Globe, Lock, Mail, Smartphone, Save
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function SystemSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    // Mock system settings
    setSettings({
      general: {
        systemName: "Asha Admin Portal",
        timezone: "UTC+05:30",
        language: "English",
        autoBackup: true,
        maintenanceMode: false
      },
      security: {
        twoFactorAuth: true,
        passwordExpiry: 90,
        sessionTimeout: 30,
        ipWhitelist: true,
        auditLogging: true
      },
      notifications: {
        emailAlerts: true,
        smsAlerts: true,
        pushNotifications: true,
        emergencyAlerts: true,
        systemUpdates: false
      },
      system: {
        maxUsers: 5000,
        dataRetention: 365,
        backupFrequency: "daily",
        logLevel: "info"
      }
    });
  }, []);

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage or API
    localStorage.setItem("systemSettings", JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully",
    });
  };

  const handleToggle = (section: string, key: string) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: !settings[section][key]
      }
    });
  };

  const handleInputChange = (section: string, key: string, value: string | number) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value
      }
    });
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

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
              <div className="h-8 w-8 rounded-lg bg-gray-500/10 grid place-items-center">
                <Settings className="text-gray-600 h-5 w-5" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">System Settings</h1>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                Configuration
              </Badge>
            </div>
            
            <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systemName">System Name</Label>
                <Input
                  id="systemName"
                  value={settings.general.systemName}
                  onChange={(e) => handleInputChange("general", "systemName", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={settings.general.timezone}
                  onChange={(e) => handleInputChange("general", "timezone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Input
                  id="language"
                  value={settings.general.language}
                  onChange={(e) => handleInputChange("general", "language", e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-gray-500">Automatically backup system data</p>
                </div>
                <Switch
                  checked={settings.general.autoBackup}
                  onCheckedChange={() => handleToggle("general", "autoBackup")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Enable system maintenance mode</p>
                </div>
                <Switch
                  checked={settings.general.maintenanceMode}
                  onCheckedChange={() => handleToggle("general", "maintenanceMode")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for admin access</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={() => handleToggle("security", "twoFactorAuth")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                <Input
                  id="passwordExpiry"
                  type="number"
                  value={settings.security.passwordExpiry}
                  onChange={(e) => handleInputChange("security", "passwordExpiry", parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleInputChange("security", "sessionTimeout", parseInt(e.target.value))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>IP Whitelist</Label>
                  <p className="text-sm text-gray-500">Restrict access by IP address</p>
                </div>
                <Switch
                  checked={settings.security.ipWhitelist}
                  onCheckedChange={() => handleToggle("security", "ipWhitelist")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-gray-500">Log all admin activities</p>
                </div>
                <Switch
                  checked={settings.security.auditLogging}
                  onCheckedChange={() => handleToggle("security", "auditLogging")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <div>
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-gray-500">Send email notifications</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.emailAlerts}
                  onCheckedChange={() => handleToggle("notifications", "emailAlerts")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-green-500" />
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-gray-500">Send SMS notifications</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.smsAlerts}
                  onCheckedChange={() => handleToggle("notifications", "smsAlerts")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-500">Browser push notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={() => handleToggle("notifications", "pushNotifications")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Emergency Alerts</Label>
                  <p className="text-sm text-gray-500">Critical emergency notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.emergencyAlerts}
                  onCheckedChange={() => handleToggle("notifications", "emergencyAlerts")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Updates</Label>
                  <p className="text-sm text-gray-500">Notifications for system updates</p>
                </div>
                <Switch
                  checked={settings.notifications.systemUpdates}
                  onCheckedChange={() => handleToggle("notifications", "systemUpdates")}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxUsers">Maximum Users</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  value={settings.system.maxUsers}
                  onChange={(e) => handleInputChange("system", "maxUsers", parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention (days)</Label>
                <Input
                  id="dataRetention"
                  type="number"
                  value={settings.system.dataRetention}
                  onChange={(e) => handleInputChange("system", "dataRetention", parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Input
                  id="backupFrequency"
                  value={settings.system.backupFrequency}
                  onChange={(e) => handleInputChange("system", "backupFrequency", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logLevel">Log Level</Label>
                <Input
                  id="logLevel"
                  value={settings.system.logLevel}
                  onChange={(e) => handleInputChange("system", "logLevel", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings} size="lg" className="bg-green-600 hover:bg-green-700">
            <Save className="h-5 w-5 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}