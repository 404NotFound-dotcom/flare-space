import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Database, Download, Upload, Clock,
  HardDrive, Shield, CheckCircle2, AlertTriangle, Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function BackupManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [backupData, setBackupData] = useState<any>(null);

  useEffect(() => {
    // Mock backup data
    setBackupData({
      lastBackup: "2024-12-14 02:30:00",
      nextBackup: "2024-12-15 02:30:00",
      backupSize: "2.4 GB",
      backupLocation: "/backup/emergency-system/",
      status: "completed",
      backupHistory: [
        { id: 1, date: "2024-12-14", time: "02:30:00", size: "2.4 GB", status: "completed", type: "automatic" },
        { id: 2, date: "2024-12-13", time: "02:30:00", size: "2.3 GB", status: "completed", type: "automatic" },
        { id: 3, date: "2024-12-12", time: "14:15:00", size: "2.3 GB", status: "completed", type: "manual" },
        { id: 4, date: "2024-12-12", time: "02:30:00", size: "2.2 GB", status: "completed", type: "automatic" },
        { id: 5, date: "2024-12-11", time: "02:30:00", size: "2.2 GB", status: "completed", type: "automatic" },
        { id: 6, date: "2024-12-10", time: "02:30:00", size: "2.1 GB", status: "failed", type: "automatic" }
      ],
      backupSettings: {
        autoBackup: true,
        frequency: "daily",
        retentionDays: 30,
        compression: true,
        encryption: true
      },
      storageInfo: {
        totalSpace: "100 GB",
        usedSpace: "45 GB",
        freeSpace: "55 GB",
        usagePercent: 45
      }
    });
  }, []);

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const handleManualBackup = () => {
    toast({
      title: "Backup Initiated",
      description: "Manual backup process has been started. This may take several minutes.",
    });

    // Simulate backup progress
    setTimeout(() => {
      toast({
        title: "Backup Completed",
        description: "Manual backup completed successfully. All data has been secured.",
      });
    }, 3000);
  };

  const handleRestore = (backupId: number) => {
    toast({
      title: "Restore Initiated",
      description: `Restoring from backup ID: ${backupId}. System will be temporarily unavailable.`,
    });
  };

  const handleDownloadBackup = (backupId: number) => {
    toast({
      title: "Download Started",
      description: `Downloading backup file for backup ID: ${backupId}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  if (!backupData) {
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
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 grid place-items-center">
                <Database className="text-purple-600 h-5 w-5" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Backup Management</h1>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Automated
              </Badge>
            </div>
            
            <Button onClick={handleManualBackup} className="bg-purple-600 hover:bg-purple-700">
              <Upload className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Backup Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Backup</p>
                  <p className="text-lg font-bold text-green-600">{backupData.lastBackup}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Backup</p>
                  <p className="text-lg font-bold text-blue-600">{backupData.nextBackup}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Backup Size</p>
                  <p className="text-lg font-bold text-purple-600">{backupData.backupSize}</p>
                </div>
                <HardDrive className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-lg font-bold text-green-600 capitalize">{backupData.status}</p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Storage Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5" />
                <span>Storage Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Space</span>
                  <span className="font-medium">{backupData.storageInfo.totalSpace}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Used Space</span>
                  <span className="font-medium">{backupData.storageInfo.usedSpace}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Free Space</span>
                  <span className="font-medium text-green-600">{backupData.storageInfo.freeSpace}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-medium">{backupData.storageInfo.usagePercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-purple-500 h-3 rounded-full" 
                    style={{width: `${backupData.storageInfo.usagePercent}%`}}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500 mb-2">Backup Location</p>
                <p className="text-sm font-mono bg-gray-100 p-2 rounded">{backupData.backupLocation}</p>
              </div>
            </CardContent>
          </Card>

          {/* Backup Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Backup Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Auto Backup</span>
                  <Badge className={backupData.backupSettings.autoBackup ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {backupData.backupSettings.autoBackup ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Frequency</span>
                  <span className="text-sm text-gray-600 capitalize">{backupData.backupSettings.frequency}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Retention</span>
                  <span className="text-sm text-gray-600">{backupData.backupSettings.retentionDays} days</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Compression</span>
                  <Badge className={backupData.backupSettings.compression ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                    {backupData.backupSettings.compression ? "Enabled" : "Disabled"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Encryption</span>
                  <Badge className={backupData.backupSettings.encryption ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {backupData.backupSettings.encryption ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleManualBackup} className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                <Upload className="h-4 w-4 mr-2" />
                Create Manual Backup
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Configure Settings
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Latest Backup
              </Button>
              
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500 mb-2">Emergency Actions</p>
                <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Restore
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Backup History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Backup History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {backupData.backupHistory.map((backup: any) => (
                <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(backup.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{backup.date} at {backup.time}</p>
                        <Badge className={backup.type === 'manual' ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                          {backup.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">Size: {backup.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(backup.status)}>
                      {backup.status}
                    </Badge>
                    
                    {backup.status === 'completed' && (
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadBackup(backup.id)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRestore(backup.id)}
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}