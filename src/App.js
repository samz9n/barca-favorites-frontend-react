/* import { useState } from 'react'; */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Favorites } from './components/Favorites';
import Navigation from './components/Navigation';
import Players from './components/Players';
import './index.css';

function App() {

  /* const [favorites, setFavorites] = useState([]); */



  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Navigation /> }>
            <Route path='players' element={ <Players /> } />
            <Route path='favorites' element={ <Favorites /> } />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
