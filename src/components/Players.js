import { List, ListItem, ListItemText, Typography, IconButton, Card, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FavoriteTwoTone from '@mui/icons-material/FavoriteTwoTone';
import '../index.css';
import { Link, Outlet } from 'react-router-dom';

export default function Players(props) {
	const [ players, setPlayers ] = useState([]);
	const [isDisabled, setIsDisabled] = useState([]);
	//FETCH ALL PLAYERS FROM API
	useEffect(() => {
		fetch('/api/players')
			.then((response) => response.json())
			.then((data) => {
				setPlayers(data.sort((a, b) => a.firstName.localeCompare(b.firstName)));
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);
	//REMOVE player
	const removePlayer = (id) => {
		fetch(`api/player/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() => {
			let updatedPlayers = [ ...players ].filter((i) => i.playerId !== id);
			setPlayers(updatedPlayers);
		});
	};
	
	return (
		<Box sx={{ display: 'flex', flexDirection:'column', alignItems:'center' }}>
			<Card
				sx={{
					width:'100%',
					maxWidth: 600,
					height:700,
					marginTop:'2em',
					display:'flex'
				}}
			>
				<List sx={{ width: '100%', overflow: 'auto' }}>
					{players.map((player) => (
						<ListItem
							key={player.playerId}
							sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}
						>
							<ListItemText
								primary={
									<Typography>
										{player.firstName} {player.lastName} ({player.position})
									</Typography>
								}
							/>
							{/* ADD TO FAVORITES BUTTON (HEART) */}
							<IconButton
								className='disable-button'
								key={player.playerId}
								/* DISABLE BUTTON IF PLAYER IS IN LOCALSTORAGE */
								disabled={localStorage.getItem('Player'+player.playerId)!==null}
								onClick={(e)=>{
									console.log(player)
									setIsDisabled([...isDisabled, player.playerId])
									props.favorites.push(player)
									/* ADD SELECTED PLAYER TO LOCALSTORAGE */
									localStorage.setItem('Player'+player.playerId, JSON.stringify(player))
									console.log(props.favorites)
								}}
								sx={{ marginLeft: '2px', marginRight: '2px', color: 'pink' }}
								edge="end"
								aria-label="addfavorite"
							>
								<FavoriteTwoTone />
							</IconButton>
							{/* IF ADMIN IS LOGGED IN, SHOW THIS SECTION */}
							{props.loggedInUser==='admin' &&
							<div>
							<IconButton
								onClick={(e) => {
									e.preventDefault();
									window.location.href = 'http://localhost:8080/player/edit/' + player.playerId;
								}}
								sx={{ marginLeft: '2px', marginRight: '2px' }}
								edge="end"
								aria-label="edit"
							>
								<EditTwoToneIcon />
							</IconButton>
							<IconButton
								onClick={() => removePlayer(player.playerId)}
								sx={{ marginLeft: '2px', marginRight: '2px' }}
								edge="end"
								aria-label="delete"
							>
								<DeleteIcon />
							</IconButton>
							</div>
							}
						</ListItem>
					))}
				</List>
			</Card>
			{/* ADD NEW PLAYER BUTTON */}
			<Button onClick={(e)=> {
				e.preventDefault();
				window.location.href = 'http://localhost:8080/player/add'
			}} className="btnHover" sx={{ backgroundColor: 'rgb(170, 219, 170)', position:'absolute' }}>
				Add new player
			</Button>
			<Button variant='contained' component={Link} to='/favorites'>
				Go to my favorites
			</Button>
			<Outlet></Outlet>
		</Box>
	);
}
