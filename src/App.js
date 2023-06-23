import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home.js'
import Signup from './components/pages/Signup.js'

function App() {
  return (
    <>
    <Router>
      <Navbar />
        <Routes>
          <Route path = '/' element={<Home/>}/>
          <Route path = '/sign-up' element = {<Signup/>}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
