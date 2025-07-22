import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmail from './pages/VerifyEmail';
import NoPage from './pages/NoPage';
import Dashboard from './pages/Dashboard';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Prefetch from './features/auth/Prefetch.jsx';
import PersistLogin from './features/auth/PersistLogin.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            {/* Authenticated path */}
            <Route element={<PersistLogin/>}>
              {/* Persists data for every child page under Prefetch*/}
              <Route element={<Prefetch/>}> 
                <Route path="dashboard" element={<Dashboard />} />
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
