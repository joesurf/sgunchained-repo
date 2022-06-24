import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import ActivityScreen from './screens/ActivityScreen';
import BucketScreen from './screens/BucketScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ExperienceScreen from './screens/ExperienceScreen';
import PaymentScreen from './screens/PaymentScreen';
import UserListScreen from './screens/UserListScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<LandingScreen />} exact />
            <Route path='/home' element={<HomeScreen />} >
              <Route path=':tag' element={<HomeScreen />} />
            </Route>
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/experience' element={<ExperienceScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/activity/:id' element={<ActivityScreen />} />
            <Route path='/bucket' element={<BucketScreen />} >
              <Route path=':id' element={<BucketScreen />} />
            </Route>
            <Route path='/admin/userlist' element={<UserListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
