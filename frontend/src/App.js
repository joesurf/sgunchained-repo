import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import ActivityScreen from './screens/ActivityScreen';
import ExperienceScreen from './screens/ExperienceScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/activity/:id' element={<ActivityScreen />} />
            <Route path='/experience' element={<ExperienceScreen />} >
              <Route path=':id' element={<ExperienceScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
