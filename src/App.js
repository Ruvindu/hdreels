import React, { useMemo } from "react";
import Paper from "@mui/material/Paper";
import Appbar from "./components/Header/Appbar";
import Footers from "./components/Footer/Footer";
import HomePage from "./components/Pages/HomePage";
import MoviesPage from "./components/Pages/MoviesPage";
import Movie from "./components/Pages/Movie";
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';




function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  
  const scrollup = () =>{
    vibr();
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const vibr = () =>{
    navigator.vibrate(47);
  }

  return (
    <ThemeProvider theme={Theme}>
      <Paper>
        <BrowserRouter>
          <Appbar />
          <Switch>
            <Route path='/' exact>
              <HomePage />
            </Route>
            <Route path='/all'>
              <MoviesPage defaultpage={1} />
            </Route>
            <Route path='/movie/:movieid'>
              <Movie />
            </Route>
          </Switch>

          <Fab color="primary" onClick={scrollup} size='medium' sx={{
            position:'fixed',
            bottom:0,
            right:0,
            // left:0,
            mb:3,
            mr:2,
            // ml:2,
            zIndex:9,
          }}>
            <KeyboardArrowUpIcon />
          </Fab>

          <Footers />
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  )
}

export default App;
