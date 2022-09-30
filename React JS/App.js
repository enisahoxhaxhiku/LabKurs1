import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Perdoruesi from './Pages/Perdoruesi';
import Takimet from './Pages/Takimet';
import Lokacioni from './Pages/Lokacioni';
import Rekomandimet from './Pages/Rekomandimet';
import Restaurantet from './Pages/Restaurantet';
import Koha from './Pages/Koha';
import Login from './Pages/Login';
import Home from './Pages/Home';





function App() {



  return (
    <Router>
      <div className="App">
        
      <Header /> 
        <div className="row-container">
          <Sidebar /> 
        
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/Perdoruesi' element={<Perdoruesi />}></Route>
            <Route exact path='/Takimet' element={<Takimet />}></Route>
            <Route exact path='/Lokacioni' element={<Lokacioni />}></Route>
            <Route exact path='/Rekomandimet' element={<Rekomandimet />}></Route>
            <Route exact path='/Restaurantet' element={<Restaurantet />}></Route>
            <Route exact path='/Koha' element={<Koha />}></Route>

          </Routes>
        </div>


      </div>
    </Router>
  );
}

export default App;