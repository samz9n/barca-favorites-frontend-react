import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Favorites } from './components/Favorites';
import Navigation from './components/Navigation';
import Players from './components/Players';
import './index.css';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [ loggedInUser, setLoggedInUser ] = useState('');
//FETCH SPRING SECURITYS LOGGED IN USER
  useEffect(() => {
		fetch('/api/currentusername')
			.then((response) => response.json())
			.then((data) => {
        setLoggedInUser(data.name)
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Navigation loggedInUser = {loggedInUser} /> }>
            <Route path='players' element={ <Players loggedInUser = {loggedInUser} favorites={favorites} /> } />
            <Route path='favorites' element={ <Favorites favorites={favorites} /> } />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
