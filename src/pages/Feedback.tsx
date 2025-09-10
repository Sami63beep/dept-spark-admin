import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

const Feedback = () => {
  const [ratingFilter, setRatingFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const feedback = [
    {
      id: "FB-001",
      ticketId: "RPT-003",
      citizenName: "Mike Wilson",
      rating: 5,
      comment: "Excellent work! The pothole was fixed quickly and professionally. Very satisfied with the service.",
      resolvedByTech: "Mary Johnson",
      date: "2024-01-10",
      category: "positive"
    },
    {
      id: "FB-002", 
      ticketId: "RPT-007",
      citizenName: "Anonymous",
      rating: 2,
      comment: "Took too long to respond and the work quality was poor. Had to call multiple times for updates.",
      resolvedByTech: "John Smith",
      date: "2024-01-09",
      category: "negative"
    },
    {
      id: "FB-003",
      ticketId: "RPT-012",
      citizenName: "Sarah Davis",
      rating: 4,
      comment: "Good service overall. Technician was professional and explained the issue well.",
      resolvedByTech: "Robert Davis", 
      date: "2024-01-09",
      category: "positive"
    },
    {
      id: "FB-004",
      ticketId: "RPT-015",
      citizenName: "James Miller",
      rating: 1,
      comment: "Very disappointed. Issue was not resolved properly and damage was caused to property.",
      resolvedByTech: "Lisa Brown",
      date: "2024-01-08",
      category: "complaint"
    },
    {
      id: "FB-005",
      ticketId: "RPT-018",
      citizenName: "Emma Thompson",
      rating: 5,
      comment: "Outstanding service! Quick response time and thorough work. Highly recommend.",
      resolvedByTech: "Michael Wilson",
      date: "2024-01-08",
      category: "positive"
    }
  ];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
        }`}
      />
    ));
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "positive":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Positive</Badge>;
      case "negative":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Negative</Badge>;
      case "complaint":
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">Complaint</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const filteredFeedback = feedback.filter(fb => {
    const matchesRating = ratingFilter === "all" || fb.rating.toString() === ratingFilter;
    const matchesTech = techFilter === "all" || fb.resolvedByTech === techFilter;
    const matchesSearch = searchTerm === "" || 
      fb.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.ticketId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRating && matchesTech && matchesSearch;
  });

  // Calculate stats
  const avgRating = (feedback.reduce((sum, fb) => sum + fb.rating, 0) / feedback.length).toFixed(1);
  const positiveCount = feedback.filter(fb => fb.category === "positive").length;
  const complaintCount = feedback.filter(fb => fb.category === "complaint").length;

  // Get unique technicians for filter
  const technicians = [...new Set(feedback.map(fb => fb.resolvedByTech))];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Citizen Feedback</h1>
          <p className="text-muted-foreground mt-2">Track service quality and citizen satisfaction</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{avgRating}</div>
              <div className="flex items-center mt-1">
                {getRatingStars(Math.round(parseFloat(avgRating)))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{feedback.length}</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Positive Feedback</CardTitle>
              <ThumbsUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{positiveCount}</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {Math.round((positiveCount / feedback.length) * 100)}% positive
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Complaints</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{complaintCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
            </CardContent>
          </Card>
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
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>

              <Select value={techFilter} onValueChange={setTechFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Technician" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Technicians</SelectItem>
                  {technicians.map(tech => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Table */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Feedback Reviews ({filteredFeedback.length})
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Showing {filteredFeedback.length} of {feedback.length} reviews
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFeedback.map((fb) => (
                <div key={fb.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {getRatingStars(fb.rating)}
                      </div>
                      <span className="text-sm font-medium">{fb.rating}/5</span>
                      {getCategoryBadge(fb.category)}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {fb.date}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-foreground leading-relaxed">{fb.comment}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{fb.citizenName}</span>
                      </div>
                      <div className="font-mono">
                        Ticket: {fb.ticketId}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Resolved by:</span>
                      <span className="font-medium text-foreground">{fb.resolvedByTech}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;