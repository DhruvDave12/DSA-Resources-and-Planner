import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomToast from './components/toasts/toasts.component';

import Auth from './pages/authentication/auth.page';
import Home from './pages/home/home.page';
import Dashboard from './pages/dashboard/dashboard.page';
import Discussion from './pages/discussion/discussion.page';
import CustomLayout from './components/layout/layout.component';

function App() {
  return (
    <>
    <CustomToast position={"top-right"} />
      <Router>
        <CustomLayout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/auth" element={<Auth />} />
            <Route exact path="/dashboard" element={<Dashboard />}/>
            <Route exact path="/discussion" element={<Discussion />}/>
          </Routes>   
        </CustomLayout>
      </Router>
    </>
  );
}

export default App;
