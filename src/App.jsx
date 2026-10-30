import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicLessons from "./pages/PublicLessons";
import LessonDetails from "./pages/LessonDetails";
import AuthorProfile from "./pages/AuthorProfile";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import DashboardHome from "./pages/DashboardHome";
import AddLesson from "./pages/AddLesson";
import MyLessons from "./pages/MyLessons";
import UpdateLesson from "./pages/UpdateLesson";
import MyFavorites from "./pages/MyFavorites";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminRoute from "./routes/AdminRoute";
import AdminHome from "./pages/admin/AdminHome";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageLessons from "./pages/admin/ManageLessons";
import ReportedLessons from "./pages/admin/ReportedLessons";
import Terms from "./pages/Terms";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/public-lessons" element={<PublicLessons />} />
          <Route path="/author/:id" element={<AuthorProfile />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/lessons/:id"
            element={
              <PrivateRoute>
                <LessonDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <PrivateRoute>
                <Pricing />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/success"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/cancel"
            element={
              <PrivateRoute>
                <PaymentCancel />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="add-lesson" element={<AddLesson />} />
            <Route path="my-lessons" element={<MyLessons />} />
            <Route path="update-lesson/:id" element={<UpdateLesson />} />
            <Route path="my-favorites" element={<MyFavorites />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <AdminHome />
                </AdminRoute>
              }
            />
            <Route
              path="admin/manage-users"
              element={
                <AdminRoute>
                  <ManageUsers />
                </AdminRoute>
              }
            />
            <Route
              path="admin/manage-lessons"
              element={
                <AdminRoute>
                  <ManageLessons />
                </AdminRoute>
              }
            />
            <Route
              path="admin/reported-lessons"
              element={
                <AdminRoute>
                  <ReportedLessons />
                </AdminRoute>
              }
            />
            <Route
              path="admin/profile"
              element={
                <AdminRoute>
                  <Profile />
                </AdminRoute>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
