import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalenderIcon} from "@mui/icons-material";
import moment from 'moment';
import { transFormImage } from '../../lib/features';

function Profile({user}) {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
        <Avatar 
        src={transFormImage(user?.avatar?.url) }
        sx={{
            width:200,
            height:200,
            objectFit:"contain",
            marginBottom:"1rem",
            border:"5px solid white",
        }}/>
        
        <ProfileCard heading={"Bio"} text={user?.bio} />

        <ProfileCard heading={"Username"} text={user?.userName} Icon={<UserNameIcon/>}/>
        <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon/>}/>
        <ProfileCard heading={"Joined"} 
        text={moment(user?.createdAt).fromNow()} 
        // moment(2025-02-25T12:34:44.688+00:00)
        Icon={<CalenderIcon/>}/>
    </Stack>
  )
};
const ProfileCard=({text,Icon,heading})=> (
    <Stack 
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
    >  
      {Icon && Icon}

      <Stack>
        <Typography variant='body1'>{text}</Typography>
        <Typography color={"gray"} variant='caption'>{heading}</Typography>
      </Stack>
    </Stack>
);

export default Profile