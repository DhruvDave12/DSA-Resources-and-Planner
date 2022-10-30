import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomToast from './components/toasts/toasts.component';

import Auth from './pages/authentication/auth.page';
import Home from './pages/home/home.page';
import Dashboard from './pages/dashboard/dashboard.page';
import Discussion from './pages/discussion/discussion.page';
import Practice from './pages/practice/practice.page';

import CustomLayout from './components/layout/layout.component';
import PrivateRoute from './components/protected-route/protected-route.component';

function App() {
  return (
    <>
    <CustomToast position={"top-right"} />
      <Router>
        <CustomLayout>
          <Routes>
            <Route exact path="/auth" element={<Auth />} />
            <Route exact path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route exact path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }/>

            <Route exact path="/discussion" element={
              <PrivateRoute>
                <Discussion />
              </PrivateRoute>
            }/>

            <Route exact path='/practice' element={
              <PrivateRoute>
                <Practice />
              </PrivateRoute>
            }/>

          </Routes>   
        </CustomLayout>
      </Router>
    </>
  );
}

export default App;
