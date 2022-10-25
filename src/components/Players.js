import React, { useEffect, useState } from 'react';
import getPlayers from '../services/PlayerService';

export default function Players() {
	const [ players, setPlayers ] = useState([]);

	/*  const getAllPlayers = () => {
    PlayerService.getPlayers()
    .then((res) => {
      setPlayers(res);
    })
  } */

	useEffect(() => {
		getPlayers.then(res => res.json())
      	.then(result => {
        setPlayers(result);
      }) 
			
		}, []);
   
  console.log(players)
  console.log(getPlayers())

	return (
		<div>
			{players.map((player) => {
				return (
					<p key={player.id}>
					  {player.firstName}
					</p>
				);
			})}
		</div>
	);
}
