import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListIcon from '@mui/icons-material/List';
import { Link, Outlet } from 'react-router-dom';

function Navigation(props) {
	const [ anchorNavi, setOpenNavi ] = useState(null);
	const [ anchorPerson, setOpenPerson ] = useState(null);

	const menuOpen = (e) => {
		setOpenNavi(e.currentTarget);
	};

	const personOpen = (e) => {
		setOpenPerson(e.currentTarget);
	};

	const menuClose = () => {
		setOpenPerson(null);
		setOpenNavi(null);
	};
  // NAVIGATION MENU(LEFT TOP CORNER) 
	const menu = (
		<Menu
			anchorEl={anchorNavi}
			open={Boolean(anchorNavi)}
			onClose={menuClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<MenuItem onClick={menuClose} component={Link} to="players">
				<ListItemIcon>
					<CreateIcon />
				</ListItemIcon>
				<ListItemText primary="Players" />
			</MenuItem>
			<MenuItem onClick={menuClose} component={Link} to="favorites">
				<ListItemIcon>
					<ListIcon />
				</ListItemIcon>
				<ListItemText primary="My favorites" />
			</MenuItem>
		</Menu>
	);
    // USER MENU (RIGHT TOP CORNER)
	  const person =
    <Menu
      anchorEl={ anchorPerson }
      open={ Boolean(anchorPerson) }
      onClose={ menuClose }
    >
      <MenuItem onClick={ menuClose }>
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText primary={'Logged in as: ' +  props.loggedInUser} />
      </MenuItem>
      {/* LOGOUT BUTTON THAT TAKES YOU TO DEFAULT LOGIN PAGE */}
      <MenuItem onClick={(e)=>{
        e.preventDefault();
		localStorage.clear();
        window.location.href = 'http://localhost:8080/logout';
        
      } }>
        <ListItemIcon color='inherit'><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary='Logout' />
      </MenuItem>
    </Menu>;

	return (
		<Box>
			<AppBar position="static" className='barca-color'>
				<Toolbar>
					<IconButton onClick={menuOpen} color="inherit">
						<MenuIcon />
					</IconButton>
					{menu}

					<Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center' }}>
						Barca Favorites
					</Typography>

					<IconButton onClick={personOpen} color="inherit">
						<AccountCircleIcon />
					</IconButton>
					{ person }
				</Toolbar>
			</AppBar>
			<Outlet />
		</Box>
	);
}

export default Navigation;
