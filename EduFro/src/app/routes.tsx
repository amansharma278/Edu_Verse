import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/protected-route";
import { Root } from "./layouts/root";
import { LandingPage } from "./pages/landing";
import { CourseListing } from "./pages/course-listing";
import { CourseDetails } from "./pages/course-details";
import { SearchResults } from "./pages/search-results";
import { HelpPage } from "./pages/help";
import { Login } from "./pages/auth/login";
import { Signup } from "./pages/auth/signup";
import { ForgotPassword } from "./pages/auth/forgot-password";
import { StudentDashboardLayout } from "./layouts/student-dashboard-layout";
import { StudentDashboard } from "./pages/student/dashboard";
import { StudentCourses } from "./pages/student/my-courses";
import { CourseLearning } from "./pages/student/course-learning";
import { Wishlist } from "./pages/student/wishlist";
import { Cart } from "./pages/student/cart";
import { Checkout } from "./pages/student/checkout";
import { StudentProfile } from "./pages/student/profile";
import { StudentSettings } from "./pages/student/settings";
import { InstructorDashboardLayout } from "./layouts/instructor-dashboard-layout";
import { InstructorDashboard } from "./pages/instructor/dashboard";
import { InstructorCourses } from "./pages/instructor/my-courses";
import { AddCourse } from "./pages/instructor/add-course";
import { InstructorAnalytics } from "./pages/instructor/analytics";
import { InstructorReviews } from "./pages/instructor/reviews";
import { InstructorProfile } from "./pages/instructor/profile";
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout";
import { AdminDashboard } from "./pages/admin/dashboard";
import { AdminUsers } from "./pages/admin/users";
import { AdminInstructors } from "./pages/admin/instructors";
import { AdminCourses } from "./pages/admin/courses";
import { AdminRevenue } from "./pages/admin/revenue";
import { NotFound } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "courses", element: <CourseListing /> },
      { path: "courses/:id", element: <CourseDetails /> },
      { path: "search", element: <SearchResults /> },
      { path: "help", element: <HelpPage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <StudentDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "my-courses", element: <StudentCourses /> },
      { path: "course/:id/learn", element: <CourseLearning /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "settings", element: <StudentSettings /> },
    ],
  },
  {
    path: "/instructor",
    element: (
      <ProtectedRoute allowedRoles={["instructor"]}>
        <InstructorDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <InstructorDashboard /> },
      { path: "my-courses", element: <InstructorCourses /> },
      { path: "add-course", element: <AddCourse /> },
      { path: "analytics", element: <InstructorAnalytics /> },
      { path: "reviews", element: <InstructorReviews /> },
      { path: "profile", element: <InstructorProfile /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <AdminUsers /> },
      { path: "instructors", element: <AdminInstructors /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "revenue", element: <AdminRevenue /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);