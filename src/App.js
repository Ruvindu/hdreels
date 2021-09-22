import React from "react";
import MoviesPage from "./components/Pages/MoviesPage";
import Appbar from "./components/Header/Appbar";
import Footers from "./components/Footer/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Movie from "./components/Pages/Movie";
import HomePage from "./components/Pages/HomePage";


function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/all' defaultpage={1}>
          <MoviesPage />
        </Route>
        <Route path='/movie/:movieid'>
          <Movie />
        </Route>
      </Switch>
      <Footers/>
    </BrowserRouter>
  ) 
}

export default App;
