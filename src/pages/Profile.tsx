import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Settings,
  Lock,
  LogOut,
  Edit,
  Shield,
  Users,
  FileText
} from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock admin data
  const admin = {
    id: "ADMIN-001",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@cityservices.gov",
    phone: "+1 (555) 200-3001",
    department: "Public Works Department",
    role: "Department Administrator",
    joinDate: "2021-06-15",
    lastLogin: "2024-01-10 14:30",
    permissions: ["Manage Reports", "Assign Technicians", "View Analytics", "Manage Team"]
  };

  const stats = {
    totalReportsManaged: 1247,
    techniciansSupervised: 12,
    avgResolutionTime: "3.2 hours",
    departmentRating: 4.7
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile & Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your account information and preferences</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{admin.name}</h3>
                    <p className="text-muted-foreground">{admin.role}</p>
                    <Badge variant="secondary" className="mt-2">
                      {admin.department}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={admin.name}
                      disabled={!isEditing}
                      className={isEditing ? "" : "bg-muted"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={admin.email}
                      disabled={!isEditing}
                      className={isEditing ? "" : "bg-muted"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={admin.phone}
                      disabled={!isEditing}
                      className={isEditing ? "" : "bg-muted"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={admin.department}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center gap-2 pt-4">
                    <Button>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Session Management</h4>
                    <p className="text-sm text-muted-foreground">Last login: {admin.lastLogin}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Reports Managed
                  </div>
                  <span className="font-semibold">{stats.totalReportsManaged}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Technicians
                  </div>
                  <span className="font-semibold">{stats.techniciansSupervised}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Avg Resolution
                  </div>
                  <span className="font-semibold">{stats.avgResolutionTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    Dept Rating
                  </div>
                  <span className="font-semibold">★ {stats.departmentRating}</span>
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {admin.permissions.map((permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
                
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Building className="h-4 w-4 mr-2" />
                  Department Settings
                </Button>

                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Data
                </Button>

                <hr className="my-4" />
                
                <Button 
                  variant="destructive" 
                  className="w-full justify-start" 
                  size="sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;