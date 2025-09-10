import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Phone,
  Camera,
  UserPlus,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReportDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [reportStatus, setReportStatus] = useState("");
  const [resolutionNotes, setResolutionNotes] = useState("");

  // Mock technicians data
  const availableTechnicians = [
    { id: "tech1", name: "John Smith", status: "available" },
    { id: "tech2", name: "Mary Johnson", status: "available" },
    { id: "tech3", name: "Robert Davis", status: "available" },
    { id: "tech4", name: "Lisa Wilson", status: "available" }
  ];

  // Mock reports data (in real app, this would come from API/state)
  const reports = [
    {
      id: "RPT-001",
      type: "Water Leak",
      description: "Large water leak near the intersection causing flooding. The water appears to be coming from a main pipe underground and has created a significant puddle that's affecting vehicle traffic.",
      location: "Main St & 5th Ave",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      timestamp: "2024-01-10 14:30",
      status: "pending",
      priority: "high",
      assignedTech: null,
      citizenName: "John Doe",
      citizenPhone: "+1 (555) 123-4567",
      citizenEmail: "john.doe@email.com",
      photos: ["/placeholder.svg"],
      feedback: null
    },
    {
      id: "RPT-002",
      type: "Street Light",
      description: "Street light not working, area is very dark at night. This creates a safety hazard for pedestrians and drivers.",
      location: "Park Avenue",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      timestamp: "2024-01-10 09:15",
      status: "in-progress",
      priority: "medium",
      assignedTech: "John Smith",
      citizenName: "Jane Smith",
      citizenPhone: "+1 (555) 234-5678",
      citizenEmail: "jane.smith@email.com",
      photos: ["/placeholder.svg"],
      feedback: null
    },
    {
      id: "RPT-003",
      type: "Pothole",
      description: "Deep pothole causing damage to vehicles. Multiple cars have reported tire damage from this location.",
      location: "Downtown Plaza",
      coordinates: { lat: 40.7282, lng: -73.9942 },
      timestamp: "2024-01-09 16:45",
      status: "resolved",
      priority: "low",
      assignedTech: "Mary Johnson",
      citizenName: "Mike Wilson",
      citizenPhone: "+1 (555) 345-6789",
      citizenEmail: "mike.wilson@email.com",
      photos: ["/placeholder.svg"],
      resolutionPhotos: ["/placeholder.svg"],
      resolutionNotes: "Pothole filled with asphalt mixture. Area monitored for 24 hours to ensure proper settling.",
      feedback: {
        rating: 5,
        comment: "Excellent service! The technician was professional and the repair was completed quickly.",
        date: "2024-01-10 10:30"
      }
    }
  ];

  const report = reports.find(r => r.id === reportId);

  if (!report) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Report Not Found</h1>
          <p className="text-muted-foreground mt-2">The requested report could not be found.</p>
          <Button onClick={() => navigate("/reports")} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setReportStatus(report.status);
    setSelectedTechnician(report.assignedTech || "");
  }, [report]);

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
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium Priority</Badge>;
      case "low":
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleAssignTechnician = () => {
    if (selectedTechnician) {
      // In real app, this would make an API call
      console.log(`Assigning technician ${selectedTechnician} to report ${report.id}`);
    }
  };

  const handleStatusUpdate = () => {
    // In real app, this would make an API call
    console.log(`Updating report ${report.id} status to ${reportStatus}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/reports")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Report Details</h1>
            <p className="text-muted-foreground mt-1">Report ID: {report.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Report Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Overview */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{report.type}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(report.status)}
                      {getPriorityBadge(report.priority)}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {report.timestamp}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">DESCRIPTION</h4>
                    <p className="text-foreground">{report.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">LOCATION</h4>
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {report.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Citizen Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Citizen Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{report.citizenName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <p className="font-medium">{report.citizenPhone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{report.citizenEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Report Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {report.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={photo} 
                        alt={`Report photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resolution Photos (if resolved) */}
            {report.status === "resolved" && report.resolutionPhotos && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Resolution Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {report.resolutionPhotos.map((photo, index) => (
                      <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <img 
                          src={photo} 
                          alt={`Resolution photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {report.resolutionNotes && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Resolution Notes</p>
                      <p className="text-foreground">{report.resolutionNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Citizen Feedback (if available) */}
            {report.feedback && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Citizen Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < report.feedback.rating 
                              ? 'fill-warning text-warning' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {report.feedback.rating}/5 stars
                      </span>
                    </div>
                    <p className="text-foreground">{report.feedback.comment}</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted on {report.feedback.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Assignment & Actions */}
          <div className="space-y-6">
            {/* Assignment Section */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {report.assignedTech ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Assigned Technician</p>
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{report.assignedTech}</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Assign Technician</p>
                      <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a technician" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTechnicians.map((tech) => (
                            <SelectItem key={tech.id} value={tech.name}>
                              {tech.name} ({tech.status})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedTechnician && (
                        <Button 
                          onClick={handleAssignTechnician}
                          className="w-full mt-2"
                        >
                          Assign Technician
                        </Button>
                      )}
                    </div>
                  )}

                  {report.assignedTech && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Reassign to</p>
                      <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select new technician" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTechnicians.map((tech) => (
                            <SelectItem key={tech.id} value={tech.name}>
                              {tech.name} ({tech.status})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedTechnician && selectedTechnician !== report.assignedTech && (
                        <Button 
                          onClick={handleAssignTechnician}
                          variant="outline"
                          className="w-full mt-2"
                        >
                          Reassign Technician
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Status Update */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Status Update
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Update Status</p>
                    <Select value={reportStatus} onValueChange={setReportStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {reportStatus === "resolved" && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Resolution Notes</p>
                      <Textarea
                        placeholder="Describe how the issue was resolved..."
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  )}

                  {reportStatus !== report.status && (
                    <Button 
                      onClick={handleStatusUpdate}
                      className="w-full"
                    >
                      Update Status
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Map Location */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Interactive Map</p>
                    <p className="text-xs">{report.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;