import { Container } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

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
import UserEditScreen from './screens/UserEditScreen';
import ActivityListScreen from './screens/ActivityListScreen';
import ActivityEditScreen from './screens/ActivityEditScreen';


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
            <Route path='/admin' >
              <Route path='userlist' element={<UserListScreen />} />
              <Route path='user/:id/edit' element={<UserEditScreen />} />
              <Route path='activitylist' element={<ActivityListScreen />} />
              <Route path='activity/:id/edit' element={<ActivityEditScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
