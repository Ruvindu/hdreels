import React, { useState, useEffect } from 'react'
import { Divider, Stack, Menu, MenuItem, Avatar, Skeleton, IconButton, InputBase, Typography, Toolbar, AppBar } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import { Link } from 'react-router-dom';



const Appbar = () => {


  const [searchQuery, setSearchQuery] = useState('');
  const [movielist, setMovielist] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleClose = () => {
    vibr();
    setAnchorEl(null);
  };


  useEffect(() => {
    setMovielist(null);
    if (searchQuery.length > 2) {

      setTimeout(async () => {
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${searchQuery}`);
        const responsedata = await response.json();
        setMovielist(responsedata);
      }, 0);

    }

  }, [searchQuery]);


  const vibr = () =>{
    navigator.vibrate(47);
  }

  return (
    <AppBar position="static">
      <Toolbar>

        <IconButton color='inherit' component={Link} to='/' onClick={vibr}>
          <LocalMoviesRoundedIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HD Reels
        </Typography>

        <IconButton color='inherit' component={Link} to={'/all'} onClick={vibr}>
          <GridViewIcon />
        </IconButton>

        <IconButton color='inherit' onClick={(e) => {vibr();setAnchorEl(true)}} >
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
              sx={{ width: 300, flexFlow: 1 }}
              placeholder="Search…"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton color='inherit' onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </MenuItem>
          <Divider />

          {
            movielist && (movielist.data.movie_count > 0) ?

              movielist && movielist.data.movies.map(mov => (
                <MenuItem x={{ mr: 1, ml: 1, mb: 1 }} component={Link} to={`/movie/${mov.id}`} onClick={handleClose}>
                  <Avatar
                    alt="Movie cover"
                    src={mov.small_cover_image}
                    variant='rounded'
                    sx={{ width: 50, height: 70 }}
                  />
                  <Stack spacing={0.8} sx={{ ml: 2 }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', fontSize: '16px' }} maxWidth={260} noWrap>
                      {mov.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '11px' }} >
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
