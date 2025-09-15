import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, ArrowRight, User, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateAdminId = (id: string) => {
    // Admin ID format: ADM followed by 6 digits (e.g., ADM123456)
    const adminIdRegex = /^ADM\d{6}$/;
    return adminIdRegex.test(id.toUpperCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAdminId(adminId)) {
      toast({
        title: "Invalid Admin ID",
        description: "Please enter a valid Admin ID (format: ADM123456)",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage for demo purposes
      localStorage.setItem("adminAuth", JSON.stringify({
        adminId: adminId.toUpperCase(),
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
        role: "admin"
      }));
      
      toast({
        title: "Login Successful",
        description: "Welcome to Admin Dashboard",
      });
      
      navigate("/admin/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-orange-500/10 grid place-items-center">
              <Shield className="text-orange-600 h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your Admin ID and password to access the control center
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminId">Admin ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="adminId"
                  type="text"
                  placeholder="Enter Admin ID (e.g., ADM123456)"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value.toUpperCase())}
                  className="pl-10"
                  maxLength={9}
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Format: ADM followed by 6 digits</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700" 
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Need an admin account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/admin/register")}
                  className="text-orange-600 hover:text-orange-800 font-medium"
                >
                  Register here
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Only LTSU staff can register
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}