import { Link } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  Menu,
  Home,
  BookOpen,
  GraduationCap,
  Briefcase,
  Users,
  ChevronRight,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "Development", icon: BookOpen, count: "12,345" },
  { name: "Business", icon: Briefcase, count: "8,432" },
  { name: "Design", icon: GraduationCap, count: "6,789" },
  { name: "Marketing", icon: Users, count: "5,234" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
                  <span className="text-xl font-bold text-white">E</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                  eduVerse
                </span>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 p-6">
              <Link to="/student/wishlist" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Button>
              </Link>
              <Link to="/student/cart" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart (3)
                </Button>
              </Link>
            </div>

            <Separator />

            {/* Main Navigation */}
            <nav className="flex flex-col gap-2 p-6">
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                Main Menu
              </h3>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                to="/courses"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span>All Courses</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </nav>

            <Separator />

            {/* Categories */}
            <div className="flex flex-col gap-2 p-6">
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                Browse by Category
              </h3>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.name}
                    to={`/courses?category=${category.name.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {category.count} courses
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                );
              })}
            </div>

            <Separator />

            {/* Auth Buttons */}
            <div className="flex flex-col gap-3 p-6">
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
