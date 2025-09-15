import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Activity, Server, Cpu, HardDrive,
  Wifi, AlertTriangle, CheckCircle2, Clock, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SystemMonitoring() {
  const navigate = useNavigate();
  const [monitoringData, setMonitoringData] = useState<any>(null);

  useEffect(() => {
    // Mock monitoring data
    setMonitoringData({
      servers: [
        { id: 1, name: "Web Server 1", status: "online", cpu: 45, memory: 68, uptime: "15 days" },
        { id: 2, name: "Database Server", status: "online", cpu: 72, memory: 84, uptime: "28 days" },
        { id: 3, name: "API Gateway", status: "online", cpu: 33, memory: 52, uptime: "12 days" },
        { id: 4, name: "Backup Server", status: "maintenance", cpu: 15, memory: 25, uptime: "3 hours" }
      ],
      systemMetrics: {
        totalRequests: 24567,
        avgResponseTime: "145ms",
        errorRate: "0.02%",
        bandwidth: "89.3 MB/s",
        activeConnections: 1247,
        lastCheck: new Date().toLocaleTimeString()
      },
      alerts: [
        { id: 1, type: "warning", message: "High memory usage on Database Server", time: "5 min ago", severity: "medium" },
        { id: 2, type: "info", message: "Backup Server maintenance scheduled", time: "1 hour ago", severity: "low" },
        { id: 3, type: "success", message: "System backup completed successfully", time: "2 hours ago", severity: "low" }
      ],
      services: [
        { name: "Authentication Service", status: "running", port: 3001, health: "excellent" },
        { name: "Notification Service", status: "running", port: 3002, health: "good" },
        { name: "Analytics Service", status: "running", port: 3003, health: "excellent" },
        { name: "File Storage Service", status: "running", port: 3004, health: "good" },
        { name: "Email Service", status: "stopped", port: 3005, health: "poor" }
      ]
    });

    // Update data every 30 seconds
    const interval = setInterval(() => {
      setMonitoringData((prev: any) => ({
        ...prev,
        systemMetrics: {
          ...prev.systemMetrics,
          lastCheck: new Date().toLocaleTimeString(),
          totalRequests: prev.systemMetrics.totalRequests + Math.floor(Math.random() * 50),
          activeConnections: prev.systemMetrics.activeConnections + Math.floor(Math.random() * 20) - 10
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "running":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "offline":
      case "stopped":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "fair":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  if (!monitoringData) {
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
              <div className="h-8 w-8 rounded-lg bg-green-500/10 grid place-items-center">
                <Activity className="text-green-600 h-5 w-5" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">System Monitoring</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* System Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Requests</p>
                  <p className="text-lg font-bold text-blue-600">{monitoringData.systemMetrics.totalRequests.toLocaleString()}</p>
                </div>
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Response Time</p>
                  <p className="text-lg font-bold text-green-600">{monitoringData.systemMetrics.avgResponseTime}</p>
                </div>
                <Clock className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Error Rate</p>
                  <p className="text-lg font-bold text-orange-600">{monitoringData.systemMetrics.errorRate}</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Bandwidth</p>
                  <p className="text-lg font-bold text-purple-600">{monitoringData.systemMetrics.bandwidth}</p>
                </div>
                <Wifi className="h-6 w-6 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Active Connections</p>
                  <p className="text-lg font-bold text-indigo-600">{monitoringData.systemMetrics.activeConnections}</p>
                </div>
                <Activity className="h-6 w-6 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Server Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>Server Status</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  Last check: {monitoringData.systemMetrics.lastCheck}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {monitoringData.servers.map((server: any) => (
                <div key={server.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{server.name}</h4>
                    <Badge className={getStatusColor(server.status)}>
                      {server.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Cpu className="h-3 w-3" />
                        <span className="text-gray-600">CPU</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${server.cpu > 80 ? 'bg-red-500' : server.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{width: `${server.cpu}%`}}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{server.cpu}%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <HardDrive className="h-3 w-3" />
                        <span className="text-gray-600">Memory</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${server.memory > 85 ? 'bg-red-500' : server.memory > 70 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                            style={{width: `${server.memory}%`}}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{server.memory}%</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-600 text-xs">Uptime</p>
                      <p className="font-medium text-xs">{server.uptime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Service Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Service Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {monitoringData.services.map((service: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${service.status === 'running' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-gray-500">Port: {service.port}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                    <p className={`text-xs font-medium ${getHealthColor(service.health)}`}>
                      {service.health}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monitoringData.alerts.map((alert: any) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <Badge className={
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}