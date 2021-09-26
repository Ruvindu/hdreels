import React from 'react'
import { Paper, Typography } from "@mui/material";


const Footer = () => {
    return (
        <Paper elevation={2} sx={{
            height: 75,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
            mt: 2,
            borderRadius:0
        }}>
            <Typography variant='p' color='GrayText' textAlign='center' fontSize={12}>
                Copyright &copy; HD Reels 2021, Powered by <Typography variant='span' color='primary' onClick={() => window.open('http://www.yts.mx', "_blank")} sx={{cursor:'pointer'}}>yts.mx</Typography> API, Developed by <Typography variant='span' color='primary' onClick={() => window.open('http://madhushanka.me', "_blank")} sx={{cursor:'pointer'}}>Madhushanka</Typography>
            </Typography>

        </Paper>
    )
}

export default Footer
