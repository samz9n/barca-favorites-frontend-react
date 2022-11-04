import { List, ListItem, ListItemText, Typography, IconButton, Card, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FavoriteTwoTone from '@mui/icons-material/FavoriteTwoTone';

export default function Players() {
	const [ players, setPlayers ] = useState([]);

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
	
	const addToFavorites = () => {
		console.log('heart pressed');
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Card
				sx={{
					minWidth: 400,
					maxWidth: 500,
					maxHeight: 800,
					margin: '2rem',
					display: 'flex',
					flexDirection: 'row',
					width: '100%'
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
							<IconButton
								onClick={addToFavorites}
								sx={{ marginLeft: '2px', marginRight: '2px', color: 'pink' }}
								edge="end"
								aria-label="addfavorite"
							>
								<FavoriteTwoTone />
							</IconButton>
							{/* <Link to={'http://localhost:8080/player/edit/' + player.playerId}> */}
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
							{/* </Link> */}
							<IconButton
								onClick={() => removePlayer(player.playerId)}
								sx={{ marginLeft: '2px', marginRight: '2px' }}
								edge="end"
								aria-label="delete"
							>
								<DeleteIcon />
							</IconButton>
						</ListItem>
					))}
				</List>
			</Card>
			<Button onClick={(e)=> {
				e.preventDefault();
				window.location.href = 'http://localhost:8080/player/add'
			}} className="btnHover" sx={{ backgroundColor: 'rgb(170, 219, 170)', position: 'absolute' }}>
				Add new player
			</Button>
		</Box>
	);
}
