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
import ProviderDashboard from "./pages/JobProvider pages/ProviderDashboard/ProviderDashboard";
import CompanyProfile from "./pages/JobProvider pages/CompanyProfile/CompanyProfile";
import FindCandidates from "./pages/JobProvider pages/FindCandidates/FindCandidates";
import PostJobs from "./pages/JobProvider pages/PostJobs/PostJobs";
import RecommendedJobs from "./pages/RecommendedJobs/RecommendedJobs";
import ProviderProfile from "./Components/ProviderProfile/ProviderProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/Messages" element={<Messages />}></Route>
        <Route path="/BrowseCompanies" element={<BrowseCompanies />}></Route>
        <Route path="/FindJobs" element={<FindJobs />}></Route>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/UserProfile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Application" element={<Application />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/UserDashboard" element={<Dashboard />} />
        <Route path="/Settings" element={<Setting />} />
        <Route path="/HelpCenter" element={<HelpCenter />} />
        <Route path="/RecommendedJobs" element={<RecommendedJobs/>} />
        <Route path="/ProviderProfile" element={<ProviderProfile/>} />


        {/* //Jobprovider routes */}
        <Route path="/ProviderDashboard" element={<ProviderDashboard/>}></Route>
        <Route path="/FindCandidates" element={<FindCandidates/>}></Route>
        <Route path="/PostJobs" element={<PostJobs/>}></Route>
        <Route path="/CompanyProfile" element={<CompanyProfile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
