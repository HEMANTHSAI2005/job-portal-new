import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Applications from './pages/Applications';
import Applyjob from './pages/Applyjob';
import Home from './pages/Home';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import 'quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClerkProvider } from '@clerk/clerk-react';

// Add the Clerk provider and your environment variable
const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  // Log the environment variable to make sure it's being used
  console.log("Backend URL test:", import.meta.env.VITE_BACKEND_URL);
  console.log("Clerk Publishable Key:", import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  // Initialize ClerkProvider with the publishable key
  const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <div>
        {/* Show Recruiter Login if true */}
        {showRecruiterLogin && <RecruiterLogin />}

        {/* Display Toast Notifications */}
        <ToastContainer />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply-job/:id" element={<Applyjob />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/dashboard" element={<Dashboard />}>
            {companyToken ? (
              <>
                <Route path="add-job" element={<AddJob />} />
                <Route path="manage-jobs" element={<ManageJobs />} />
                <Route path="view-applications" element={<ViewApplications />} />
              </>
            ) : null}
          </Route>
        </Routes>
      </div>
    </ClerkProvider>
  );
};

export default App;
