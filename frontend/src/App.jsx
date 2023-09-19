import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Test from "./Components/student/Test";
import Landing from "./pages/Home/Landing";

import Meeting from "./Components/student/Meeting";
import Navbar from "./Components/Navbar";
import ConfirmBooking from "./Components/mentor/ConfirmBooking";
import Courses from "./Components/student/Course";
import CreateTest from "./Components/mentor/Createtest";
import Gettest from "./Components/Gettest";
import Meetings from "./Components/mentor/Meetings";
import ProtectedRoute from "./Components/PrivateRoute";

import Mentortest from "./Components/mentor/mentor-test";
import Report from "./Components/student/Report";
import Discuss from "./Components/student/Discuss";
import Leaderboard from "./Components/student/Leaderboard";
import Newsfeed from "./Components/student/Newsfeed";
import Profile from "./Components/student/Profile";
import Settings from "./Components/student/Settings";
import Protectedroute1 from "./Components/Protectedroute1";
function App() {
  function isJWTValid() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    if (!isJWTValid()) {
      let val = localStorage.getItem("token");
      if (val !== null) {
        toast.error("Session expired! Please Login");
      }
      if (val === null) {
        toast.success("Please Login");
      }
    }
  }, []);

  const MAX_TOAST_LIMIT = 1;
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= MAX_TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <div className="App">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/"element={<Landing/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
         </Route>

      {/* <Route path="/book-meeting" element={<ProtectedRoute />}>
            <Route path="/book-meeting" element={<Meeting />} />
          </Route> */}
             
          <Route path="/createtest"  element={<Protectedroute1/>}>
            <Route path="/createtest" element={<CreateTest />} />
          </Route>
          {/* <Route path="/user/report" element={<ProtectedRoute />}>
         <Route path="/user/report" element={<Report />} />
         </Route> */}

          
      {/* <Route path="createtest" element={<CreateTest />} /> */}
    <Route path="/user" element={<ProtectedRoute />} >
  <Route path="courses" element={<Courses />} />
  <Route path="test" element={<Test />} />
  <Route path="gettest" element={<Gettest />} />
  <Route path="book-meeting" element={<Meeting />} />
  <Route path="Meetings" element={<Meetings />} />
  <Route path="discuss" element={<Discuss />} />
  <Route path="report" element={<Report />} />
  <Route path="leaderboard" element={<Leaderboard />} />
  <Route path="newsfeed" element={<Newsfeed />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
  <Route path="confirm-booking/:id" element={<ConfirmBooking />} />
  <Route path="my-Test" element={<Mentortest />} />
  {/* <Route path="createtest" element={<CreateTest />} /> */}
</Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
