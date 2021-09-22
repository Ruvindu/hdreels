import React from 'react'
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box varient='div' sx={{
            height: 75,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
            mt: 2
        }}>
            <Typography variant='p' color='GrayText' textAlign='center'>
                Copyright &copy; HD Reels 2021, Powered by <Typography variant='span' color='primary' onClick={() => window.open('http://www.yts.mx', "_blank")} sx={{cursor:'pointer'}}>yts.mx</Typography> API, Developed by <Typography variant='span' color='primary' onClick={() => window.open('http://madhushanka.me', "_blank")} sx={{cursor:'pointer'}}>Madhushanka</Typography>
            </Typography>

        </Box>
    )
}

export default Footer
