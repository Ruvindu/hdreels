import React, { useEffect, useState } from 'react';
import { Container, Grid, Pagination, Skeleton, Stack, Divider, Typography } from "@mui/material";
import MovieCard from "./MovieCard";


const MoviesPage = (props) => {

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

                <Grid container spacing={0}>


                    {
                        !movielist &&

                        [...Array(20).keys()].map(m =>

                            <Grid item item xs={12} lg={3} md={4} sm={12} sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
                                <Stack spacing={1} >
                                    <Skeleton variant="rectangular" height={386} width={270} animation="wave" sx={{ borderRadius: 1 }} />
                                    <Skeleton variant="rectangular" height={60} width={270} animation="wave" sx={{ borderRadius: 1 }} />
                                    <Skeleton variant="text" width={270} animation="wave" />
                                </Stack>
                            </Grid>

                        )

                    }


                    {

                        movielist && (movielist['data']['movies']).map(mov =>
                            <Grid item xs={12} lg={3} md={4} sm={12} sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
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
                    // siblingCount={2}
                    size={'medium'}
                />

            </Container>

        </div>
    );
}

export default MoviesPage
