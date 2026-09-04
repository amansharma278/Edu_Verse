import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Star } from "lucide-react";

const reviews = [
  { name: "John Smith", rating: 5, date: "2 weeks ago", comment: "Excellent course! Very clear explanations.", course: "Web Development Bootcamp" },
  { name: "Sarah Williams", rating: 5, date: "1 month ago", comment: "Best instructor I've had on this platform.", course: "Python Masterclass" },
  { name: "Michael Brown", rating: 4, date: "2 months ago", comment: "Great content, would love more advanced topics.", course: "Data Science Course" },
];

export function InstructorReviews() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Student Reviews</h1>
        <p className="text-muted-foreground">See what students are saying about your courses</p>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <Card className="p-6">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold mb-2">4.8</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]" />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Course Rating</div>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-4">
                <Progress value={rating === 5 ? 85 : rating === 4 ? 12 : 2} className="flex-1" />
                <div className="flex items-center gap-1 w-16">
                  <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                  <span className="text-sm">{rating}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold mb-1">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.course}</p>
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
