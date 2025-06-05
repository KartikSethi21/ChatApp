import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { gray, matblack } from '../../constants/color'
import { Close as CloseIcon, Dashboard, ExitToApp, Groups, ManageAccounts, Menu as MenuIcon, Message} from '@mui/icons-material'
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom';

const Link=styled(LinkComponent)({
    textDecoration:"none",
    borderRadius:"2rem",
    padding:"1rem 2rem",
    color:"black",
    "&:hover":{
        color:"rgba(0,0,0,0.54)",
    }

})

const adminTabs=[
    {
    name:"Dashboard",
    path:"/admin/dashboard",
    icon:<Dashboard/>,
    },
    {
    name:"Users",
    path:"/admin/users",
    icon:<ManageAccounts/>,
    },
    {
    name:"Chats",
    path:"/admin/chats",
    icon:<Groups/>,
    },
    {
    name:"Messages",
    path:"/admin/messages",
    icon:<Message/>,
    },
    ];
const SideBar=({w="100%"})=>{
    const location=useLocation();
    const logoutHandler=()=>{
        console.log("Logout");
    }

    return <Stack 
    width={w} 
    direction={"column"}
    spacing={"3rem"}
    > 
        <Typography variant='h5' textTransform={"uppercase"}>
            Admin 
        </Typography>

        <Stack spacing={"1rem"}>
            {
                adminTabs.map((tab)=>(
                    <Link key={tab.path} to={tab.path} 
                    sx={
                        location.pathname === tab.path && {
                            bgcolor:matblack,
                            color:'white',
                            ":hover":{color: 'white'},
                        }
                    }
                    >
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={"1rem"}
                          >
                            {tab.icon}
                            <Typography  >{tab.name}</Typography>
                          </Stack>
                    </Link>
                ))
            }
            <Link  onClick={logoutHandler}   >
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={"1rem"}
                          >
                            <ExitToApp/>
                            <Typography  >Logout</Typography>
                          </Stack>
                    </Link>
        </Stack>
    </Stack>
}

const isAdmin=true;
const AdminLayout=({children})=> {
    const [isMobile,setIsMobile]=useState(false);

    const handleMobile=()=>setIsMobile(!isMobile);

    const handleClose=()=> setIsMobile(false);

    if(!isAdmin) return <Navigate to={"/admin"}/>
  return (
    <div>
        <Grid container minHeight={"100vh"}>
            <Box 
            sx={{
                display:{xs:"block",md:"none"},
                position:"fixed",
                right:"1rem",
                top:"1rem"
            }} >
                <IconButton onClick={handleMobile}>
                    {
                        isMobile ? <CloseIcon/>: <MenuIcon/>
                    }
                </IconButton>
            </Box>
            <Grid 
              item
              md={4}
              lg={3}
              sx={{display:{xs:"none", md:"block"}}}
            >
                <SideBar/>
            </Grid>
            <Grid 
            item
            xs={12}
            md={8}
            lg={9}
            sx={{
                bgcolor:gray,
            }}
            >
            {children}
            </Grid>
            <Drawer open={isMobile} onClose={handleClose}>
                <SideBar w="50vw" />

            </Drawer>
        
        </Grid>
        </div>
        
  )
}

export default AdminLayout