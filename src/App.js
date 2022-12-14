import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Favorites } from './components/Favorites';
import Navigation from './components/Navigation';
import Players from './components/Players';
import './index.css';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [ loggedInUser, setLoggedInUser ] = useState('');
  const [onError, setOnError] = useState('Loading...')
//FETCH SPRING SECURITYS LOGGED IN USER
  useEffect(() => {
		fetch('https://barcafavorites.herokuapp.com/api/currentusername', {credentials:'include'})
			.then((response) => response.json())
			.then((data) => {
        setLoggedInUser(data.name)
        setOnError('');
			})
			.catch((err) => {
				setOnError('Failed to fetch data!')
			});
	}, []);

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Navigation loggedInUser = {loggedInUser} setLoggedInUser={setLoggedInUser} /> }>
            <Route path='players' element={ <Players loggedInUser = {loggedInUser} favorites={favorites} setFavorites={setFavorites} /> } />
            <Route path='favorites' element={ <Favorites favorites={favorites} setFavorites={setFavorites} /> } />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
