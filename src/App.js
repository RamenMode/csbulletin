import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home.js'
import Signup from './components/pages/Signup.js'
import Faq from './components/pages/Faq.js'
import Bulletin from './components/pages/Bulletin.js'
import CreateListing from './components/pages/CreateListing.js'

function App() {
  return (
    <>
    <Router>
      <Navbar />
        <Routes>
          <Route path = '/' element={<Home/>}/>
          <Route path = '/sign-up' element = {<Signup/>}/>
          <Route path = '/faq' element = {<Faq/>}/>
          <Route path = '/bulletin' element = {<Bulletin/>}/>
          <Route path = '/createListing' element = {<CreateListing/>}></Route>
        </Routes>
    </Router>
    </>
  );
}

export default App;
