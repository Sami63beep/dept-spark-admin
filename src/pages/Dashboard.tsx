import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  PlayCircle, 
  CheckCircle,
  TrendingUp,
  Users,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = {
    totalReports: 156,
    pending: 23,
    inProgress: 45,
    resolved: 88
  };

  const recentReports = [
    { id: "RPT-001", type: "Water Leak", location: "Main St & 5th Ave", status: "pending", tech: "Unassigned", priority: "high" },
    { id: "RPT-002", type: "Street Light", location: "Park Avenue", status: "in-progress", tech: "John Smith", priority: "medium" },
    { id: "RPT-003", type: "Pothole", location: "Downtown Plaza", status: "resolved", tech: "Mary Johnson", priority: "low" },
    { id: "RPT-004", type: "Traffic Signal", location: "City Center", status: "pending", tech: "Unassigned", priority: "high" },
    { id: "RPT-005", type: "Sidewalk Repair", location: "Oak Street", status: "in-progress", tech: "Robert Davis", priority: "medium" },
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

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Department Overview</h1>
          <p className="text-muted-foreground mt-2">Monitor your department's performance and recent activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalReports}</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reports</CardTitle>
              <Clock className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting assignment</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
              <PlayCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground mt-1">Being worked on</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.resolved}</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                85% completion rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports Table */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Recent Reports</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Latest 5 reports in your department</p>
            </div>
            <Button variant="outline" size="sm">
              View All Reports
            </Button>
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
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report) => (
                    <tr key={report.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 font-mono text-sm font-medium">{report.id}</td>
                      <td className="py-3 px-2">{report.type}</td>
                      <td className="py-3 px-2 text-sm">{report.location}</td>
                      <td className="py-3 px-2">{getStatusBadge(report.status)}</td>
                      <td className="py-3 px-2">{getPriorityBadge(report.priority)}</td>
                      <td className="py-3 px-2 text-sm">
                        {report.tech === "Unassigned" ? (
                          <span className="text-muted-foreground flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Unassigned
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            {report.tech}
                          </span>
                        )}
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

export default Dashboard;