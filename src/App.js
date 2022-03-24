import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar.js';
import Banner from './Components/Banner.js';
import Movies from './Components/Movies.js';
import Favrourite from './Components/Favrourite.js';
import { BrowserRouter as Router , Route, BrowserRouter , Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <>
            <Banner/>
            <Movies/>
          </>
        }/>
        <Route path='/Favrourite' element={<Favrourite/>}/>
      </Routes>
    </Router>
  );
}

export default App;
