import { Card, CardContent, Box, Grid, Paper, Button, Typography } from '@mui/material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Players from './Players';

export const Favorites = (props) => {
	//REMOVES SELECTED PLAYER FROM FAVORITES
	const removeFavorite = (id) => {
		let updatedFavorites = [ ...props.favorites ].filter((i) => i.playerId !== id);
		props.setFavorites(updatedFavorites);
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Button sx={{ margin: '1rem' }} variant="contained" component={Link} to="/players">
				Back to adding favorites
			</Button>
			{/* IF THERE IS NO ADDED FAVORITES, SHOW TEXT */}
			{props.favorites.length === 0 && (
				<Typography color="white" variant="h6">
					No added favorites!
				</Typography>
			)}
			<Grid sx={{ flexGrow: 1 }} container spacing={2}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" spacing={2}>
						{/* MAP OVER ALL FAVORITE PLAYERS */}
						{props.favorites.map((player) => {
							return (
								<Grid key={player.playerId} item>
									<Paper
										sx={{
											display: 'flex',
											flexDirection: 'column',
											height: 250,
											width: 200,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'space-between',
											background: '#181733'
										}}
									>
										<Typography variant="h6" color='#fdc52c'>
											<strong>{player.firstName} {player.lastName}</strong>
										</Typography>
										{/* SHOW IF PLAYER HAS NATIONALITY NAME */}
										{player.nationality!==null && <Typography color='white' variant='h7'>{player.nationality.name}</Typography>}
										{player.nationality===null && <Typography color='white' variant='h7'></Typography>}
										<Typography color='white'>{player.position}</Typography>
										<Typography color='white'>{'Age: ' + player.age}</Typography>
										<Typography color='white'>{'Number: ' + player.shirtNumber}</Typography>
										<Button
											sx={{ width: '100%' }}
											variant="contained"
											color="error"
											onClick={(e) => {
												e.preventDefault();
												localStorage.removeItem('Player' + player.playerId);
												removeFavorite(player.playerId);
											}}
										>
											Remove
										</Button>
									</Paper>
								</Grid>
							);
						})}
					</Grid>
				</Grid>
			</Grid>
			<Outlet />
		</Box>
	);
};
