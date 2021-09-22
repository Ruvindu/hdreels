import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { Button, Divider, Skeleton, Stack, Typography, Box } from "@mui/material";
import MovieCard from "./MovieCard";
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';


const HomePage = () => {

    // const [navpage, setnavPage] = useState();
    const [popularList, setPopularList] = useState(null);
    const [latestList, setLatestList] = useState(null);

    useEffect(() => {
        setPopularList(null);
        window.scrollTo(0, 0);
        setTimeout(async () => {
            const response = await fetch(`https://yts.mx/api/v2/list_movies.json?limit=4&sort_by=download_count`);
            const responsedata = await response.json();
            setPopularList(responsedata);
            console.log(popularList);
        }, 0)

    }, []);

    useEffect(() => {
        setLatestList(null);
        setTimeout(async () => {
            const response = await fetch(`https://yts.mx/api/v2/list_movies.json?limit=8&sort_by=date_added`);
            const responsedata = await response.json();
            setLatestList(responsedata);
            console.log(popularList);
        }, 0)

    }, []);


    return (
        <Container maxWidth="lg" sx={{ mt: 7, mb: 7 }}>

            <Typography variant='h5'>Popular Downloads</Typography>
            <Divider sx={{ mt: 2, mb: 4 }} />

            <Grid container spacing={5}>


                {
                    !popularList &&

                    [...Array(4).keys()].map(m =>

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

                    popularList && (popularList['data']['movies']).map(mov =>
                        <Grid item xs={3}>
                            <MovieCard moviedata={mov} />
                        </Grid>
                    )

                }


                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <Box >
                        <Button variant='contained' size='large' component={Link} to='/all' sx={{ paddingLeft: 6, paddingRight: 6 }}>Browse more</Button>
                    </Box>

                </Grid>

            </Grid>



            <Box sx={{mt:4}}>
                <Typography variant='h5'>Latest Movies</Typography>
                <Divider sx={{ mt: 2, mb: 4 }} />
            </Box>


            <Grid container spacing={5}>


                {
                    !latestList &&

                    [...Array(8).keys()].map(m =>

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

                    latestList && (latestList['data']['movies']).map(mov =>
                        <Grid item xs={3}>
                            <MovieCard moviedata={mov} />
                        </Grid>
                    )

                }

            </Grid>


        </Container>
    )
}

export default HomePage
