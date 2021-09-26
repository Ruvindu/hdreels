import React from 'react'
import { Divider, Stack, Rating, Typography, Button, CardMedia, CardContent, CardActions, Card } from '@mui/material';
import { Link } from 'react-router-dom';


const SuggestionsCard = (props) => {

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                alt="Movie cover image"
                image={props.moviedata.medium_cover_image}
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

                <Stack spacing={1}>
                    <Rating name="half-rating" defaultValue={(props.moviedata.rating) / 2} precision={0.1} readOnly size='small' max={1} sx={{ mr: 1 }} />
                </Stack>
                <Typography variant='span' fontSize='12px' >Rating ({props.moviedata.rating}) </Typography>

                <Button size="small" variant='outlined' sx={{ flexGrow: 1, ml: 1 }} component={Link} to={'/movie/' + props.moviedata.id} >visit</Button>
            </CardActions>
        </Card>
    )
}

export default SuggestionsCard
