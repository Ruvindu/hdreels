import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { Skeleton, Stack, Divider, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';


const MoviesPage = (props) => {

    // const [navpage, setnavPage] = useState(1);
    const [navpage, setnavPage] = useState(parseInt(localStorage.getItem('page') ? localStorage.getItem('page') : props.defaultpage));
    const [movielist, setMovielist] = useState(null);

    const handleChange = (event, value) => {
        setnavPage(value);
    };


    useEffect(() => {
        setMovielist(null);
        window.scrollTo(0, 0);
        setTimeout(async () => {
            const response = await fetch(`https://yts.mx/api/v2/list_movies.json?page=${navpage}`);
            const responsedata = await response.json();
            setMovielist(responsedata);
        }, 0)
        localStorage.setItem('page', navpage);
    }, [navpage]);


    return (
        <div>

            <Container maxWidth="lg" sx={{ mt: 7, mb: 7 }}>

                <Typography variant='h5'>All Movies - page [ {navpage} ]</Typography>
                <Divider sx={{ mt: 2, mb: 4 }} />

                <Grid container spacing={5}>


                    {
                        !movielist &&

                        [...Array(20).keys()].map(m =>

                            <Grid item xs={3}>
                                <Stack spacing={1} >
                                    <Skeleton variant="rectangular" height={386} animation="wave" sx={{ borderRadius: 1 }} />
                                    <Skeleton variant="rectangular" height={60} animation="wave" sx={{ borderRadius: 1 }} />
                                    <Skeleton variant="text" animation="wave" />
                                </Stack>
                            </Grid>

                        )

                    }


                    {

                        movielist && (movielist['data']['movies']).map(mov =>
                            <Grid item xs={3}>
                                <MovieCard moviedata={mov} />
                            </Grid>
                        )

                    }




                </Grid>



                <Pagination
                    count={movielist && ((movielist.data.movie_count) / 20).toFixed(0)}
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 5, display: "flex", justifyContent: "center" }}
                    page={navpage}
                    onChange={handleChange}
                    siblingCount={2}
                />

            </Container>

        </div>
    );
}

export default MoviesPage
