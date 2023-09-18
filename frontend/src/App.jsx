import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Test from "./Components/Test";
import Landing from "./pages/Home/Landing";

import Meeting from "./Components/Meeting";
import Navbar from "./Components/Navbar";
import ConfirmBooking from "./Components/ConfirmBooking";
// import Test11 from "./Components/Test11";
import Courses from "./Components/Course";
import CreateTest from "./Components/Createtest";
import Gettest from "./Components/Gettest";
// import Createtest1 from "./Components/Createtest1";
import Meetings from "./Components/mentor-page/Meetings";
import ProtectedRoute from "./Components/PrivateRoute";
import FAQsection from "./Components/FAQsection";
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
          <Route path="/" element={<Landing />} />
          <Route path="/book-meeting" element={<ProtectedRoute />}>
            <Route path="/book-meeting" element={<Meeting />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQsection />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
           <Route path="/test" element={<Test />} />
        
             <Route path="/createtest" element={<CreateTest />} />
             <Route path="/gettest" element={<Gettest />} />
            
            <Route path="/courses" element={<Courses classId={`clmnd94480001vgy0xtlg1uaj`}/>} />
          <Route path="/confirm-booking/:id" element={<ConfirmBooking />} />
          <Route path="/Meetings" element={<Meetings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
