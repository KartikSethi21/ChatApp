
import React, { useState } from 'react'
import {Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import {CameraAlt as CameraAltIcon} from "@mui/icons-material"
import { VisuallyHiddenInput } from "../../components/styles/StylesComponent"

import { useFileHandler, useInputValidation } from '6pp';

import { bgGradient } from '../../constants/color';
import { Navigate } from 'react-router-dom';

const isAdmin=true;

function AdminLogin() {
    
  const [isLogin,setIsLogin]=useState(true);
  const toggleLogin=()=>setIsLogin(( prev)=> !prev );



  const secretKey=useInputValidation();


  const submitHandler=(e)=>{
    e.preventDefault();
  }

  if(isAdmin) return <Navigate to={"/admin/dashboard"}/>;
  return (
    <div
    style={{
      backgroundImage:bgGradient
    }}>
    <Container
         component={"main"} 
         maxWidth="xs" 
         sx={{
          height:"100vh",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"}} 
    >
      <Paper
      elevation={3}
      sx={{
        padding:4,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        }}>
         
          <>
          <Typography>Admin Login</Typography>
          <form
           style={{
            width:"100%",
            marginTop:"1rem"
          }}  
            onSubmit={submitHandler}  
          >
           
            <TextField 
            required="true" 
            fullWidth
            type="password"
            label="Secret Key"
            margin='normal'
            variant='outlined'
            value={secretKey.value}
            onChange={secretKey.changeHandler}
            />
             {secretKey.error && (
              <Typography color="error" variant="caption" >
                {secretKey.error}
              </Typography>
            )}
            <Button
            sx={{
              marginTop:"1rem"
            }}
            variant='contained'
            color='primary'
            type='submit'
            fullWidth>
              Login
              </Button>
            
           
          </form>
          </>
          
          
      </Paper>
      </Container>
      </div>
  )
}

export default AdminLogin