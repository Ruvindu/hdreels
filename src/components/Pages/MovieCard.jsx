import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Rating, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                alt="Movie cover image"
                image={props.moviedata.large_cover_image}
            />
            <CardContent sx={{ padding: 1 }}>

                <Typography variant='p' fontSize='16px' fontWeight='bold' noWrap paragraph sx={{ marginBottom: '5px' }}>
                    {props.moviedata.title}
                </Typography>
                <Typography variant='p' fontSize='14px' noWrap paragraph sx={{ marginBottom: '5px' }}>
                    {props.moviedata.year ? props.moviedata.year + ' / ' : ''} {props.moviedata.genres ? (props.moviedata.genres).toString() : ''}
                </Typography>

            </CardContent>
            <Divider />
            <CardActions>

                <Typography variant='span' fontSize='12px' >Rating ({props.moviedata.rating}) </Typography>
                <Stack spacing={1}>
                    <Rating name="half-rating" defaultValue={(props.moviedata.rating) / 2} precision={0.1} readOnly size='small' sx={{ ml: 1 }} />
                </Stack>

                <Button size="small" variant='outlined' sx={{ flexGrow: 1, ml: 1 }} component={Link} to={'/movie/' + props.moviedata.id} >visit</Button>
            </CardActions>
        </Card>
    )
}

export default MovieCard
