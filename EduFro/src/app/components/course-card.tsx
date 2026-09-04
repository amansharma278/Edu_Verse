import { Link } from "react-router";
import { Star, Clock, Users, BookOpen, Heart } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  students: number;
  duration: string;
  lessons: number;
  thumbnail: string;
  category: string;
  bestseller?: boolean;
  showProgress?: boolean;
  progress?: number;
}

export function CourseCard({
  id,
  title,
  instructor,
  price,
  originalPrice,
  rating,
  reviewCount,
  students,
  duration,
  lessons,
  thumbnail,
  category,
  bestseller,
  showProgress,
  progress,
}: CourseCardProps) {
  return (
    <Card className="group overflow-hidden border-0 bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/courses/${id}`}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          <ImageWithFallback
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {bestseller && (
            <Badge className="absolute top-3 left-3 bg-[#f59e0b] text-white border-0">
              Bestseller
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>

        <Link to={`/courses/${id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[#4F46E5] transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-3">{instructor}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{lessons} lessons</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
            <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviewCount.toLocaleString()})
          </span>
          <div className="flex items-center gap-1 ml-auto">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {students.toLocaleString()}
            </span>
          </div>
        </div>

        {showProgress && typeof progress === "number" && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-semibold">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
