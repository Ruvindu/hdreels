import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import { Divider, Stack } from '@mui/material';




const Appbar = () => {


  const [searchQuery, setSearchQuery] = useState('');
  const [movielist, setMovielist] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    setMovielist(null);
    if (searchQuery.length > 2) {
      console.log(searchQuery);

      setTimeout(async () => {
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${searchQuery}`);
        const responsedata = await response.json();
        setMovielist(responsedata);
      }, 0);

    }

  }, [searchQuery])

  return (
    <AppBar position="static">
      <Toolbar>

        <IconButton color='inherit' component={Link} to='/'>
          <LocalMoviesRoundedIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HD Reels
        </Typography>

        <IconButton color='inherit' onClick={(e) => setAnchorEl(true)}>
          <SearchIcon />
        </IconButton>


        <Menu
          autoFocus={false}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}

        >
          <MenuItem sx={{ mr: 1, ml: 1, mb: 1 }}>
            <InputBase
              sx={{ width: 350 }}
              placeholder="Search…"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </MenuItem>
          <Divider />

          {
            movielist && (movielist.data.movie_count > 0) ?

              movielist && movielist.data.movies.map(mov => (
                <MenuItem x={{ mr: 1, ml: 1, mb: 1 }} component={Link} to={`/movie/${mov.id}`} >
                  <Avatar
                    alt="No Preview"
                    src={mov.small_cover_image}
                    variant='rounded'
                    sx={{ width: 50, height: 70 }}
                  />
                  <Stack spacing={0.8} sx={{ ml: 2 }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                      {mov.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '11px' }}>
                      {mov.genres ? (mov.genres).toString() : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '11px' }}>
                      {mov.year}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))

              :

              !movielist &&
              <MenuItem x={{ mr: 1, ml: 1, mb: 1 }}>
                <Skeleton variant="rectangular" animation="wave" width={50} height={63} sx={{ borderRadius: 1 }} />
                <Stack spacing={0.8} sx={{ ml: 2 }}>
                  <Skeleton variant="text" animation="wave" width={220} />
                  <Skeleton variant="text" animation="wave" width={150} height={15} />
                  <Skeleton variant="text" animation="wave" width={100} height={15} />
                </Stack>
              </MenuItem>

          }

        </Menu>

      </Toolbar>
    </AppBar>
  )
}

export default Appbar
