import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  Filter,
  MapPin,
  Calendar,
  User,
  Phone,
  Eye,
  UserPlus,
  RotateCcw,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const reports = [
    {
      id: "RPT-001",
      type: "Water Leak",
      description: "Large water leak near the intersection causing flooding",
      location: "Main St & 5th Ave",
      timestamp: "2024-01-10 14:30",
      status: "pending",
      priority: "high",
      assignedTech: null,
      citizenName: "John Doe",
      citizenPhone: "+1 (555) 123-4567"
    },
    {
      id: "RPT-002",
      type: "Street Light",
      description: "Street light not working, area is very dark at night",
      location: "Park Avenue",
      timestamp: "2024-01-10 09:15",
      status: "in-progress",
      priority: "medium",
      assignedTech: "John Smith",
      citizenName: "Jane Smith",
      citizenPhone: "+1 (555) 234-5678"
    },
    {
      id: "RPT-003",
      type: "Pothole",
      description: "Deep pothole causing damage to vehicles",
      location: "Downtown Plaza",
      timestamp: "2024-01-09 16:45",
      status: "resolved",
      priority: "low",
      assignedTech: "Mary Johnson",
      citizenName: "Mike Wilson",
      citizenPhone: "+1 (555) 345-6789"
    },
    {
      id: "RPT-004",
      type: "Traffic Signal",
      description: "Traffic light stuck on red in all directions",
      location: "City Center",
      timestamp: "2024-01-10 11:20",
      status: "pending",
      priority: "high",
      assignedTech: null,
      citizenName: "Sarah Johnson",
      citizenPhone: "+1 (555) 456-7890"
    },
    {
      id: "RPT-005",
      type: "Sidewalk Repair",
      description: "Cracked sidewalk creating trip hazard",
      location: "Oak Street",
      timestamp: "2024-01-09 13:10",
      status: "in-progress",
      priority: "medium",
      assignedTech: "Robert Davis",
      citizenName: "Lisa Brown",
      citizenPhone: "+1 (555) 567-8901"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">Pending</Badge>;
      case "in-progress":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">In Progress</Badge>;
      case "resolved":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter;
    const matchesSearch = searchTerm === "" || 
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Department Reports</h1>
          <p className="text-muted-foreground mt-2">Manage and track all reports in your department</p>
        </div>

        {/* Filters */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Reports ({filteredReports.length})
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Showing {filteredReports.length} of {reports.length} reports
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Report ID</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Location</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Priority</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Assigned Tech</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr 
                      key={report.id} 
                      className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => navigate(`/reports/${report.id}`)}
                    >
                      <td className="py-4 px-2">
                        <div className="font-mono text-sm font-medium">{report.id}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {report.timestamp}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="font-medium">{report.type}</div>
                        <div className="text-sm text-muted-foreground mt-1 max-w-xs truncate">
                          {report.description}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {report.location}
                        </div>
                      </td>
                      <td className="py-4 px-2">{getStatusBadge(report.status)}</td>
                      <td className="py-4 px-2">{getPriorityBadge(report.priority)}</td>
                      <td className="py-4 px-2">
                        {report.assignedTech ? (
                          <div className="flex items-center gap-1 text-sm">
                            <User className="h-3 w-3 text-muted-foreground" />
                            {report.assignedTech}
                          </div>
                        ) : (
                          <span className="text-muted-foreground flex items-center gap-1 text-sm">
                            <AlertCircle className="h-3 w-3" />
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/reports/${report.id}`);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {!report.assignedTech ? (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
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

export default Reports;