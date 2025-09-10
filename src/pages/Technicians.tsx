import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users,
  User,
  Eye,
  Settings,
  UserPlus,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Activity
} from "lucide-react";

const Technicians = () => {
  // Mock data
  const technicians = [
    {
      id: "TECH-001",
      name: "John Smith",
      email: "john.smith@cityservices.gov",
      phone: "+1 (555) 101-2001",
      status: "available",
      currentAssignedReports: 3,
      totalResolved: 142,
      avgResolutionTime: "2.5 hours",
      rating: 4.8,
      joinDate: "2022-03-15"
    },
    {
      id: "TECH-002", 
      name: "Mary Johnson",
      email: "mary.johnson@cityservices.gov",
      phone: "+1 (555) 102-2002",
      status: "busy",
      currentAssignedReports: 5,
      totalResolved: 98,
      avgResolutionTime: "3.2 hours",
      rating: 4.6,
      joinDate: "2021-08-22"
    },
    {
      id: "TECH-003",
      name: "Robert Davis", 
      email: "robert.davis@cityservices.gov",
      phone: "+1 (555) 103-2003",
      status: "available",
      currentAssignedReports: 2,
      totalResolved: 203,
      avgResolutionTime: "1.8 hours",
      rating: 4.9,
      joinDate: "2020-11-08"
    },
    {
      id: "TECH-004",
      name: "Lisa Brown",
      email: "lisa.brown@cityservices.gov", 
      phone: "+1 (555) 104-2004",
      status: "inactive",
      currentAssignedReports: 0,
      totalResolved: 67,
      avgResolutionTime: "4.1 hours",
      rating: 4.3,
      joinDate: "2023-01-12"
    },
    {
      id: "TECH-005",
      name: "Michael Wilson",
      email: "michael.wilson@cityservices.gov",
      phone: "+1 (555) 105-2005", 
      status: "busy",
      currentAssignedReports: 4,
      totalResolved: 156,
      avgResolutionTime: "2.9 hours",
      rating: 4.7,
      joinDate: "2021-05-03"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Available</Badge>;
      case "busy":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Busy</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const availableTechs = technicians.filter(tech => tech.status === "available").length;
  const busyTechs = technicians.filter(tech => tech.status === "busy").length;
  const inactiveTechs = technicians.filter(tech => tech.status === "inactive").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Technicians</h1>
            <p className="text-muted-foreground mt-2">Manage your department technicians and their assignments</p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Technician
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Technicians</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{technicians.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active team members</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{availableTechs}</div>
              <p className="text-xs text-success mt-1">Ready for assignments</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Busy</CardTitle>
              <Activity className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{busyTechs}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently working</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Inactive</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{inactiveTechs}</div>
              <p className="text-xs text-muted-foreground mt-1">Not available</p>
            </CardContent>
          </Card>
        </div>

        {/* Technicians Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Team Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Technician</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Contact</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Current Reports</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Performance</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {technicians.map((tech) => (
                    <tr key={tech.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {getInitials(tech.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{tech.name}</div>
                            <div className="text-sm text-muted-foreground font-mono">{tech.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{tech.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{tech.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">{getStatusBadge(tech.status)}</td>
                      <td className="py-4 px-2">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">{tech.currentAssignedReports}</div>
                          <div className="text-xs text-muted-foreground">active reports</div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">{tech.totalResolved}</span> resolved
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Avg: {tech.avgResolutionTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">★ {tech.rating}</span>
                            <span className="text-xs text-muted-foreground">rating</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Technicians;