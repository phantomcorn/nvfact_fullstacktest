import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmail from './pages/VerifyEmail.jsx';
import NoPage from './pages/NoPage.jsx';
import ManageUsersPage from "./pages/ManageUsersPage/ManageUsersPage.jsx"
import AuthLayout from './component/AuthLayout/AuthLayout.jsx';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import PersistLogin from './features/auth/PersistLogin.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            {/* Authenticated path */}
            <Route element={<PersistLogin/>}>
              <Route element={<AuthLayout/>}>
                <Route path="/manage" element={<ManageUsersPage/>} />
                <Route path="/dashboard" element={<Dashboard/>}/>
              </Route> 
            </Route>
        
            <Route path="/" element={<LoginPage />} />
            <Route index element={<LoginPage />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            {/* Fallback route for unmatched paths */}
            <Route path="*" element={<NoPage />} />
   
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
