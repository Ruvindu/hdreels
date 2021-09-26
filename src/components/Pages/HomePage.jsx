import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Divider, Skeleton, Stack, Typography, Box } from "@mui/material";
import MovieCard from "./MovieCard";
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
        }, 0)

    }, []);

    useEffect(() => {
        setLatestList(null);
        setTimeout(async () => {
            const response = await fetch(`https://yts.mx/api/v2/list_movies.json?limit=8&sort_by=year`);
            const responsedata = await response.json();
            setLatestList(responsedata);
        }, 0)

    }, []);


    return (
        <Container maxWidth="lg" sx={{ mt: 7, mb: 7 }}>

            <Typography variant='h5'>Popular Downloads</Typography>
            <Divider sx={{ mt: 2, mb: 4 }} />

            <Grid container spacing={0}>


                {
                    !popularList &&

                    [...Array(4).keys()].map(m =>

                        <Grid item xs={12} lg={3} md={4} sm={12} sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
                            <Stack spacing={1} >
                                <Skeleton variant="rectangular" height={386} width={270} animation="wave" sx={{ borderRadius: 1 }} />
                                <Skeleton variant="rectangular" height={60} width={270} animation="wave" sx={{ borderRadius: 1 }} />
                                <Skeleton variant="text" width={270} animation="wave" />
                            </Stack>
                        </Grid>

                    )

                }


                {

                    popularList && (popularList['data']['movies']).map(mov =>
                        <Grid item xs={12} lg={3} md={4} sm={12} sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
                            <MovieCard moviedata={mov} />
                        </Grid>
                    )

                }


                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 3 }}>
                    <Box >
                        <Button variant='contained' size='large' component={Link} to='/all' sx={{ paddingLeft: 6, paddingRight: 6 }}>Browse more</Button>
                    </Box>

                </Grid>

            </Grid>



            <Box sx={{ mt: 4 }}>
                <Typography variant='h5'>Latest Movies</Typography>
                <Divider sx={{ mt: 2, mb: 4 }} />
            </Box>


            <Grid container spacing={0}>


                {
                    !latestList &&

                    [...Array(8).keys()].map(m =>

                        <Grid item xs={12} lg={3} md={4} sm={12} sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
                            <Stack spacing={1} >
                                <Skeleton variant="rectangular" height={386} animation="wave" width={270} sx={{ borderRadius: 1 }} />
                                <Skeleton variant="rectangular" height={60} animation="wave" width={270} sx={{ borderRadius: 1 }} />
                                <Skeleton variant="text" width={270} animation="wave" />
                            </Stack>
                        </Grid>

                    )

                }


                {

                    latestList && (latestList['data']['movies']).map(mov =>
                        <Grid item xs={12} lg={3} md={4} sm={12} sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
                            <MovieCard moviedata={mov} />
                        </Grid>
                    )

                }

            </Grid>


        </Container>
    )
}

export default HomePage
