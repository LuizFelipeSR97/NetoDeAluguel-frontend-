import {
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom';

import MainPage from './pages/Main/indexMain';
import SignInPage from './pages/SignIn/indexSignIn';
import SignUpPage from './pages/SignUp/indexSignUp';
import ProfilePage from './pages/Profile/indexProfile';
import OpenServicesPage from './pages/Services/indexOpenServices';
import UserServicesPage from './pages/Services/indexUserServices';
import ServiceInfoPage from './pages/Services/indexServiceInfo';

import { UserProvider } from './contexts/UserContext';

export default function App() {

    return (
      <>
        <UserProvider>
          <Router>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/user/:id" element={<ProfilePage />} />
                <Route path="/services/open" element={<OpenServicesPage />} />
                <Route path="/services/:userId" element={<UserServicesPage />} />
                <Route path="/service/:id" element={<ServiceInfoPage />} />
              </Routes>
          </Router>
        </UserProvider>
      </>
    );
  }
  