import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Mail, Lock, ArrowRight, Shield, Copy, ArrowLeft } from "lucide-react";

export default function AdminRegister() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAdminId, setGeneratedAdminId] = useState("");
  const [showAdminId, setShowAdminId] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateMobileNumber = (mobile: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const validateBusinessEmail = (email: string) => {
    // Only allow ltsu.ac.in domain for admin registration
    const allowedDomain = 'ltsu.ac.in';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }
    
    const domain = email.split('@')[1]?.toLowerCase();
    return domain === allowedDomain;
  };

  const generateAdminId = () => {
    // Generate admin ID: ADM + 6 random digits
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `ADM${randomNum}`;
  };

  const copyAdminId = () => {
    navigator.clipboard.writeText(generatedAdminId);
    toast({
      title: "Admin ID Copied",
      description: "Admin ID has been copied to clipboard",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateName(name)) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name (at least 2 characters)",
        variant: "destructive",
      });
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    if (!validateBusinessEmail(email)) {
      toast({
        title: "Invalid Email Domain",
        description: "Please use an email address from the ltsu.ac.in domain",
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

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Password and confirm password do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const adminId = generateAdminId();
      setGeneratedAdminId(adminId);
      
      // Store user data in localStorage for demo purposes
      localStorage.setItem("adminAuth", JSON.stringify({
        name,
        mobileNumber,
        email,
        adminId,
        isLoggedIn: true,
        registrationTime: new Date().toISOString(),
        role: "admin"
      }));
      
      setShowAdminId(true);
      setIsLoading(false);
      
      toast({
        title: "Registration Successful",
        description: "Your admin account has been created successfully.",
      });
    }, 1500);
  };

  const proceedToDashboard = () => {
    navigate("/admin/dashboard");
  };

  if (showAdminId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 grid place-items-center">
                <Shield className="text-green-600 h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-green-600">Registration Complete!</CardTitle>
            <CardDescription className="text-center">
              Your Admin ID has been generated. Save it for future logins.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
              <Label className="text-sm font-medium text-gray-700">Your Admin ID</Label>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-orange-600">{generatedAdminId}</span>
                <Button variant="outline" size="sm" onClick={copyAdminId}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Use this Admin ID to login to your account
              </p>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Please save your Admin ID safely. You will need it to login.
              </p>
            </div>

            <Button 
              onClick={proceedToDashboard}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Proceed to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-orange-500/10 grid place-items-center">
              <Shield className="text-orange-600 h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Registration</CardTitle>
          <CardDescription className="text-center">
            Create an admin account to manage the disaster response system
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
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="pl-10"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">LTSU Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="user@ltsu.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Must be from ltsu.ac.in domain</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                "Creating Account..."
              ) : (
                <>
                  Create Admin Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/admin/login")}
                  className="text-orange-600 hover:text-orange-800 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}