import React, { useEffect, useState } from 'react';

export default function Players() {
	const [ players, setPlayers ] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8080/api/players", {
			credentials: 'include'
		}).then((response)=>response.json())
		.then((data)=> {
			console.log(data)
			setPlayers(data)
		})
		.catch((err)=> {
			console.log(err.message);
		});
	}, []);

	return (
		<div>
			
			{players.map((player) => 
				<p key={player.shirtNumber}>{player.firstName}</p>
			)}
	
		</div>
	);
}
