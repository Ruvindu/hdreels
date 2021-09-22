import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const SuggestionsCard = (props) => {
    return (
        <Card sx={{ maxWidth: 300 }}>
        <CardMedia
            component="img"
            alt="green iguana"
            image={props.moviedata.medium_cover_image}
        />
        <CardContent sx={{ padding: 1 }}>

            <Typography variant='p' fontSize='16px' fontWeight='bold' noWrap paragraph sx={{ marginBottom: '5px' }}>
                {props.moviedata.title}
            </Typography>
            <Typography variant='p' fontSize='14px' noWrap paragraph sx={{ marginBottom: '5px' }}>
                {props.moviedata.year?props.moviedata.year + ' / ' :''} {props.moviedata.genres?(props.moviedata.genres).toString():''}
            </Typography>

        </CardContent>
        <Divider />
        <CardActions>

                <Stack spacing={1}>
                    <Rating name="half-rating" defaultValue={(props.moviedata.rating) / 2} precision={0.1} readOnly size='small' max={1} sx={{ mr: 1 }} />
                </Stack>
                <Typography variant='span' fontSize='12px' >Rating ({props.moviedata.rating}) </Typography>

            <Button size="small" variant='outlined' sx={{flexGrow:1, ml:1}} component={Link} to={'/movie/'+props.moviedata.id} >visit</Button>
        </CardActions>
    </Card>
    )
}

export default SuggestionsCard
