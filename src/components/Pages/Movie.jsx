import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Grid from "@mui/material/Grid";
import { Skeleton, Stack, Button, Container, Divider, Typography } from "@mui/material";
import Card from "@mui/material/Card"
import Box from "@mui/material/Box"
import CardMedia from "@mui/material/CardMedia"
import IconButton from "@mui/material/IconButton"
import Rating from '@mui/material/Rating';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import HighQualityOutlinedIcon from '@mui/icons-material/HighQualityOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import SuggestionsCard from './SuggestionsCard';
import { Link } from "react-router-dom";


const Movie = () => {

    const { movieid } = useParams();
    const [moviedata, setMoviedata] = useState(null);
    const [suggestions, setSuggestions] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setMoviedata(null);
        setTimeout(async () => {
            const response = await fetch(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${movieid}`
            );
            const responsedata = await response.json();
            setMoviedata(responsedata);
        }, 0);


        setSuggestions(null);
        setTimeout(async () => {
            const response = await fetch(
                `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieid}`
            );
            const responsedata = await response.json();
            setSuggestions(responsedata);
        }, 0);


    }, [movieid]);



    return (
        <Container maxWidth="md" sx={{ mt: 7, mb: 7 }}>

            <Grid container spacing={3} >
                <Grid item xs={5}>
                    {
                        !moviedata &&
                        <Skeleton variant="rectangular" height={510} animation="wave" sx={{ borderRadius: 1 }} />

                    }

                    {
                        moviedata &&
                        <Card>
                            {
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    image={moviedata.data.movie.large_cover_image}
                                />
                            }
                        </Card>
                    }
                </Grid>

                <Grid item xs={7}>
                    {
                        !moviedata &&
                        <Stack spacing={1} >
                            <Skeleton variant="rectangular" height={50} animation="wave" sx={{ borderRadius: 1 }} />
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Skeleton variant="text" animation="wave" width={100} />
                            <Skeleton variant="text" animation="wave" width={100} />
                            <Skeleton variant="rectangular" height={20} width={200} animation="wave" sx={{ borderRadius: 1, mt: 2 }} />

                            <Box sx={{ paddingTop: 6 }}>

                                <Stack spacing={2}>
                                    <Skeleton variant="rectangular" height={20} width={80} animation="wave" sx={{ borderRadius: 1 }} />
                                    <Skeleton variant="rectangular" height={20} width={80} animation="wave" sx={{ borderRadius: 1 }} />
                                    <Skeleton variant="rectangular" height={20} width={230} animation="wave" sx={{ borderRadius: 1 }} />
                                </Stack>


                                <Grid container spacing={0.5}>

                                    <Grid item xs sx={{ padding: 10 }}>

                                        <Box sx={{ marginTop: 4, paddingLeft: 1, borderLeft: '3px solid #ccc ' }} >
                                            <Stack spacing={1}>
                                                <Skeleton variant="rectangular" height={20} width={100} animation="wave" sx={{ borderRadius: 1 }} />
                                                <Skeleton variant="rectangular" height={20} width={100} animation="wave" sx={{ borderRadius: 1 }} />
                                                <Skeleton variant="rectangular" height={20} width={100} animation="wave" sx={{ borderRadius: 1 }} />
                                            </Stack>
                                        </Box>

                                    </Grid>

                                    <Grid item xs sx={{ padding: 10 }}>

                                        <Box sx={{ marginTop: 4, paddingLeft: 1, borderLeft: '3px solid #ccc ' }} >
                                            <Stack spacing={1}>
                                                <Skeleton variant="rectangular" height={20} width={100} animation="wave" sx={{ borderRadius: 1 }} />
                                                <Skeleton variant="rectangular" height={20} width={100} animation="wave" sx={{ borderRadius: 1 }} />
                                                <Skeleton variant="rectangular" height={20} width={100} animation="wave" sx={{ borderRadius: 1 }} />
                                            </Stack>
                                        </Box>

                                    </Grid>

                                </Grid>

                            </Box>

                        </Stack>
                    }

                    {
                        moviedata &&
                        <Box>
                            <Typography variant='h4' color='primary'>{moviedata.data.movie.title_long}</Typography>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Typography variant='subtitle1' fontSize='14px' color='GrayText'>Year : {moviedata.data.movie.year}</Typography>
                            <Typography variant='subtitle1' fontSize='14px' color='GrayText'>Language : {moviedata.data.movie.language}</Typography>

                            <Box sx={{ mt: 2, fontWeight: 'bold' }}>
                                <Typography variant='p' fontSize='18px' color='GrayText'>{moviedata.data.movie.genres ? (moviedata.data.movie.genres).toString() : ''}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
                                <IconButton sx={{ mr: 1 }} color='secondary'>
                                    <FavoriteBorderOutlinedIcon />
                                </IconButton>
                                <Typography sx={{ paddingTop: 1 }}>
                                    {moviedata.data.movie.like_count}
                                </Typography>
                            </Box>


                            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <IconButton sx={{ mr: 1 }} color='secondary'>
                                    <FileDownloadOutlinedIcon />
                                </IconButton>
                                <Typography sx={{ paddingTop: 1 }}>
                                    {moviedata.data.movie.download_count}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Typography sx={{ paddingTop: 1 }}>
                                    Rating ({moviedata.data.movie.rating}/10)
                                </Typography>

                                <Rating name="half-rating" defaultValue={(moviedata.data.movie.rating) / 2} precision={0.1} readOnly sx={{ ml: 1, paddingTop: 1 }} />

                            </Box>


                            <Grid container spacing={0.5}>
                                {
                                    moviedata && moviedata.data.movie.torrents.map(download => (

                                        <Grid item xs sx={{ padding: 10 }}>

                                            <Box sx={{ marginTop: 4, paddingLeft: 1, borderLeft: '3px solid #ccc ' }} >
                                                <Box sx={{ display: 'flex' }}><HighQualityOutlinedIcon sx={{ mr: 1 }} /> <Typography color='GrayText'>{download.quality} ({download.type})</Typography></Box>
                                                <Box sx={{ display: 'flex' }}><FolderOpenOutlinedIcon sx={{ mr: 1 }} /> <Typography color='GrayText'>{download.size}</Typography></Box>
                                                <Button variant="text" startIcon={<FileDownloadOutlinedIcon />} size='small' onClick={() => window.open(download.url, "_blank")} sx={{ mt: 1 }}> Download</Button>
                                            </Box>

                                        </Grid>
                                    ))

                                }
                            </Grid>



                            {/* <Typography variant='p' color='GrayText' sx={{textAlign:"justify"}}>&nbsp;&nbsp;&nbsp;&nbsp;{moviedata.data.movie.description_full}</Typography> */}
                        </Box>
                    }


                </Grid>

                <Grid item xs={12}>

                    <Divider sx={{ mt: 1, mb: 1 }} />

                    {
                        !moviedata &&
                        <Skeleton variant="rectangular" height={200} animation="wave" sx={{ borderRadius: 1, mt: 3 }} />
                    }

                    {
                        moviedata &&
                        <Typography sx={{ paddingTop: 1, textAlign: "justify" }}>
                            {moviedata.data.movie.description_full}
                        </Typography>
                    }

                </Grid>

                {/* Suggestions */}

                <Grid item xs>

                    <Divider sx={{ mt: 2, mb: 1 }} />

                    <Typography variant='h5' color='GrayText' sx={{ mt: 2, mb: 3 }}>Suggestions for you</Typography>

                    <Grid container spacing={2}>

                        {

                            suggestions && (suggestions['data']['movies']).map(mov =>
                                <Grid item xs={3}>
                                    <SuggestionsCard moviedata={mov} />
                                </Grid>
                            )

                        }

                        {
                            !suggestions && [...Array(4).keys()].map(m =>
                                <Grid item xs={3}>
                                    <Skeleton variant="rectangular" height={350} animation="wave" sx={{ borderRadius: 1, mt: 3 }} />
                                </Grid>
                            )
                        }



                    </Grid>


                </Grid>

            </Grid>



        </Container>
    );
};

export default Movie;
