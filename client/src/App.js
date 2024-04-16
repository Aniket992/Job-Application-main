import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Application from "./pages/Application/Application";
import FindJobs from "./pages/FindJobs/FindJobs";
import NotFound from "./pages/NotFound/NotFound";
import Setting from "./pages/Settings/Setting";
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import Dashboard from "./pages/Dashboard/Dashboard";
import BrowseCompanies from "./pages/BrowseCompanies/BrowseCompanies";
import Messages from "./pages/Messages/Messages";
import AboutUs from "./pages/AboutUs/AboutUs";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/Messages" element={<Messages />}></Route>
        <Route path="/BrowseCompanies" element={<BrowseCompanies />}></Route>
        <Route path="/FindJobs" element={<FindJobs />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Application" element={<Application />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Settings" element={<Setting />} />
        <Route path="/HelpCenter" element={<HelpCenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
