import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, UserPlus, Users, Shield, Map, Search } from "lucide-react";

export default function VolunteerTeam() {
  const [teamName, setTeamName] = useState<string>("");
  const [teamDescription, setTeamDescription] = useState<string>("");
  const [teamType, setTeamType] = useState<string>("");
  const [teamLocation, setTeamLocation] = useState<string>("");
  const [teamSize, setTeamSize] = useState<string>("5");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSkillToggle = (skill: string) => {
    setRequiredSkills(current => 
      current.includes(skill) 
        ? current.filter(s => s !== skill) 
        : [...current, skill]
    );
  };

  const handleCreateTeam = () => {
    // Validate form
    if (!teamName.trim()) {
      toast({
        title: "Team Name Required",
        description: "Please enter a name for your team.",
        variant: "destructive"
      });
      return;
    }

    if (!teamType) {
      toast({
        title: "Team Type Required",
        description: "Please select a team type.",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    // Simulate team creation process
    setTimeout(() => {
      // Store team data in localStorage for demo purposes
      const teams = JSON.parse(localStorage.getItem("volunteerTeams") || "[]");
      const newTeam = {
        id: Date.now().toString(),
        name: teamName,
        description: teamDescription,
        type: teamType,
        location: teamLocation,
        size: parseInt(teamSize),
        isOpen,
        requiredSkills,
        members: [
          // Current user is automatically added as team leader
          {
            id: "current-user",
            name: JSON.parse(localStorage.getItem("volunteerAuth") || '{"name":"Volunteer"}').name,
            role: "leader",
            skills: requiredSkills.slice(0, 3) // Assume user has some of the required skills
          }
        ],
        createdAt: new Date().toISOString()
      };
      
      teams.push(newTeam);
      localStorage.setItem("volunteerTeams", JSON.stringify(teams));

      toast({
        title: "Team Created",
        description: "Your volunteer team has been created successfully. Invite members to join."
      });

      // Navigate back to dashboard
      navigate("/volunteer/dashboard");
    }, 1500);
  };

  const skillsList = [
    { id: "firstAid", label: "First Aid" },
    { id: "searchRescue", label: "Search & Rescue" },
    { id: "medicalSupport", label: "Medical Support" },
    { id: "communication", label: "Communication" },
    { id: "navigation", label: "Navigation" },
    { id: "waterRescue", label: "Water Rescue" },
    { id: "logistics", label: "Logistics" },
    { id: "driving", label: "Driving" },
    { id: "cooking", label: "Cooking" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/volunteer/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-gray-900">Manage Teams</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Team Information</span>
                </CardTitle>
                <CardDescription>
                  Enter the basic details for your new volunteer team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name *</Label>
                  <Input 
                    id="team-name" 
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="team-description">Description</Label>
                  <Textarea 
                    id="team-description" 
                    placeholder="Describe your team's mission and objectives"
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-type">Team Type *</Label>
                    <Select 
                      value={teamType} 
                      onValueChange={setTeamType}
                    >
                      <SelectTrigger id="team-type">
                        <SelectValue placeholder="Select team type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rescue">Rescue Team</SelectItem>
                        <SelectItem value="medical">Medical Support</SelectItem>
                        <SelectItem value="logistics">Logistics & Supply</SelectItem>
                        <SelectItem value="shelter">Shelter Management</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="team-location">Operating Location</Label>
                    <Input 
                      id="team-location" 
                      placeholder="Where will your team operate?"
                      value={teamLocation}
                      onChange={(e) => setTeamLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-size">Team Size</Label>
                    <Select 
                      value={teamSize} 
                      onValueChange={setTeamSize}
                    >
                      <SelectTrigger id="team-size">
                        <SelectValue placeholder="Select max team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 flex items-end">
                    <div className="flex items-center space-x-2 h-10">
                      <Checkbox 
                        id="is-open" 
                        checked={isOpen}
                        onCheckedChange={(checked) => setIsOpen(!!checked)}
                      />
                      <label
                        htmlFor="is-open"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Open for others to join
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Required Skills</span>
                </CardTitle>
                <CardDescription>
                  Select skills that are relevant for your team's mission.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skillsList.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={skill.id} 
                        checked={requiredSkills.includes(skill.id)}
                        onCheckedChange={() => handleSkillToggle(skill.id)}
                      />
                      <label
                        htmlFor={skill.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {skill.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/volunteer/dashboard")}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateTeam}
                disabled={isCreating}
              >
                {isCreating ? (
                  <span>Creating...</span>
                ) : (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Create Team
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Info Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How Teams Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Better Coordination</p>
                    <p className="text-sm text-gray-600">
                      Teams allow volunteers to coordinate efforts for better impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Skill Specialization</p>
                    <p className="text-sm text-gray-600">
                      Build teams with complementary skills to tackle complex tasks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Map className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Geographic Coverage</p>
                    <p className="text-sm text-gray-600">
                      Organize teams to cover specific areas for more efficient response.
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-gray-600">
                    As a team leader, you'll be able to coordinate tasks, invite members, and manage team operations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Find Team Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  After creating your team, you can:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 text-sm">
                    <Search className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>Search for volunteers with specific skills</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <UserPlus className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>Send invitations to join your team</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                  disabled={true}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Browse Potential Members
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}