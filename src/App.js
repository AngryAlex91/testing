import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AddPost from './Pages/AddPost';
import MainComponent from "./Components/MainComponent"; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainComponent/>}/>
          <Route path='/AddPost' element={<AddPost/>}/>
      
      </Routes>
      </Router>
    </div>
  );
}

export default App;
