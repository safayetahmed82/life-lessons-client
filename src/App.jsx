import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import AddLesson from "./pages/AddLesson";
import MyLessons from "./pages/MyLessons";
import UpdateLesson from "./pages/UpdateLesson";
import PublicLessons from "./pages/PublicLessons";

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/public-lessons" element={<PublicLessons />} />
          <Route
            path="/dashboard/add-lesson"
            element={
              <PrivateRoute>
                <AddLesson />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/my-lessons"
            element={
              <PrivateRoute>
                <MyLessons />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/update-lesson/:id"
            element={
              <PrivateRoute>
                <UpdateLesson />
              </PrivateRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <PrivateRoute>
                <p className="p-10">Pricing page coming soon</p>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
