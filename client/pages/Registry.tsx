import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Shield, LifeBuoy, Building2, CheckCircle2, PlusCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const teams = {
  medical: [
    { name: "Alpha Medical Unit", description: "Focuses on emergency medical response.", members: "5/8" },
    { name: "Bravo Health Services", description: "Provides primary health care in shelters.", members: "3/5" },
  ],
  physical: [
    { name: "Rescue Rangers", description: "Specializes in search and rescue operations.", members: "10/12" },
    { name: "Logistics Crew", description: "Manages supply chain and distribution.", members: "7/10" },
  ],
  social: [
    { name: "Community Support Team", description: "Offers psychological first aid and support.", members: "4/6" },
    { name: "Welfare Warriors", description: "Assists with documentation and social services.", members: "2/5" },
  ],
};

export default function Registry() {
  const [userType, setUserType] = useState<"citizen" | "ngo" | "control" | null>(null);
  const [skill, setSkill] = useState("");

  const renderForm = () => {
    switch (userType) {
      case "citizen":
        return (
          <Card className="w-full max-w-md animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="text-primary" />Citizen Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input className="w-full rounded-md border px-3 py-2" placeholder="Full Name" />
              <input className="w-full rounded-md border px-3 py-2" placeholder="Email Address" />
              <input className="w-full rounded-md border px-3 py-2" placeholder="Password" type="password" />
              <Button className="btn-gradient w-full">Create Account</Button>
            </CardContent>
          </Card>
        );
      case "ngo":
        return (
          <div className="w-full max-w-2xl animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><LifeBuoy className="text-emerald-600" />NGO/Volunteer Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input className="w-full rounded-md border px-3 py-2" placeholder="Full Name / NGO Name" />
                  <input className="w-full rounded-md border px-3 py-2" placeholder="Email Address" />
                </div>
                <Select onValueChange={setSkill}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your volunteering field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="physical">Physical (Search & Rescue, Logistics)</SelectItem>
                    <SelectItem value="social">Social Welfare</SelectItem>
                  </SelectContent>
                </Select>

                {skill && (
                  <div className="space-y-4 pt-4">
                    <h3 className="font-semibold text-lg">Available Teams</h3>
                    <div className="grid gap-4">
                      {teams[skill as keyof typeof teams].map(team => (
                        <div key={team.name} className="flex items-center justify-between p-3 rounded-lg border">
                          <div>
                            <p className="font-semibold">{team.name}</p>
                            <p className="text-sm text-muted-foreground">{team.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{team.members} members</p>
                            <Button size="sm" variant="outline" className="mt-1">Select Team</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Or</p>
                      <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4" /> Create Your Own Team</Button>
                    </div>
                  </div>
                )}
                <Button className="btn-gradient w-full mt-4">Register</Button>
              </CardContent>
            </Card>
          </div>
        );
      case "control":
        return (
          <Card className="w-full max-w-md animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="text-orange-600" />Control Room Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input className="w-full rounded-md border px-3 py-2" placeholder="Official ID" />
              <input className="w-full rounded-md border px-3 py-2" placeholder="Email Address" />
              <input className="w-full rounded-md border px-3 py-2" placeholder="Password" type="password" />
              <Button className="btn-gradient w-full">Register</Button>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="text-center animate-slide-up">
            <h1 className="text-3xl font-extrabold">Choose Your Role</h1>
            <p className="mt-2 text-muted-foreground">Select how you want to get involved.</p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="card-hover cursor-pointer" onClick={() => setUserType("citizen")}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2"><User className="text-primary" />Citizen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Access alerts, find shelters, and report incidents.</p>
                </CardContent>
              </Card>
              <Card className="card-hover cursor-pointer" onClick={() => setUserType("ngo")}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2"><LifeBuoy className="text-emerald-600" />NGO/Volunteer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Join teams, manage tasks, and contribute to relief efforts.</p>
                </CardContent>
              </Card>
              <Card className="card-hover cursor-pointer" onClick={() => setUserType("control")}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2"><Shield className="text-orange-600" />Control Room</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Oversee operations, manage resources, and coordinate teams.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-home-gradient flex items-center justify-center py-12 px-4">
      {renderForm()}
    </div>
  );
}