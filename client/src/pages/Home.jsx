import React from 'react'
import AppLayout  from "../components/layout/AppLayout";
import { Box, Typography } from '@mui/material';
import { gray } from '../constants/color';
function Home() {
  return (
    <Box height={"100%"} bgcolor={gray}>
    <Typography p={"2rem"} variant='h5' textAlign={"center"}>
      Select a friend to Chat  
    </Typography>  
    </Box>
  )
}

export default AppLayout()(Home);