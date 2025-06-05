import React, { useState } from 'react'
import {Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import {CameraAlt as CameraAltIcon} from "@mui/icons-material"
import { useFileHandler, useInputValidation,useStrongPassword } from '6pp';
import { usernameValidator } from '../utils/validator';
import { bgGradient } from '../constants/color';
import { VisuallyHiddenInput } from '../components/styles/StylesComponent';
import axios from 'axios';
import { server } from '../constants/config';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';


function Login() {

  const [isLogin,setIsLogin]=useState(true);
  const toggleLogin=()=>setIsLogin(( prev)=> !prev );

  // const [name,setName]=useState("");
  // const [bio,setBio]=useState("");
  // const [password,setPassword]=useState("");
  // const [userName,setUserName]=useState("");
  const name=useInputValidation("",);
  const bio=useInputValidation("");
  const userName=useInputValidation("",usernameValidator);
  const password=useStrongPassword();
  const avatar=useFileHandler("single");
  const dispatch=useDispatch();

  const handleSignUp=async(e)=>{
    e.preventDefault();

    const formData=new FormData();
    formData.append("avatar",avatar.file);
    formData.append("name",name.value);
    formData.append("bio",bio.value);
    formData.append("userName",userName.value);
    formData.append("password",password.value);

    const config={
      withCredentials:true,
      headers:{
       "Content-Type":"multipart/form-data",
      }
     };

    try {
      const {data}=await axios.post(`${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(true));
      toast.success(data.message);
    } catch (erro) {
        toast.error(erro?.response?.data?.message || "Something went wrong");
    }

  };


  const handleLogin=async(e)=>{    
    e.preventDefault();
    const config={
      withCredentials:true,
      headers:{
        "Content-Type":"application/json",
      },
    };
  try {
    const {data}= await axios.post(`${server}/api/v1/user/login`,{
      userName:userName.value,
      password:password.value,
    },
    config
  );
  dispatch(userExists(true));
  toast.success(data.message);
  } catch (erro) {
    toast.error(erro?.response?.data?.message || "Something went wrong");
    
  }
  };

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
        {isLogin ?( 
          <>
          <Typography>Login</Typography>
          <form
           style={{
            width:"100%",
            marginTop:"1rem"
          }}  
            onSubmit={handleLogin}  
          >
            <TextField 
            required={true}
            fullWidth
            label="Username"
            margin='normal'
            variant='outlined'
            value={userName.value}
            onChange={userName.changeHandler}
             autoComplete="userNAme"
            />
            {userName.error && (
              <Typography color="error" variant="caption" >
                {userName.error}
              </Typography>
            )}
            <TextField 
            required={true}
            fullWidth
            type='password'
            label="Password"
            margin='normal'
            variant='outlined'
            value={password.value}
            onChange={password.changeHandler}
             autoComplete="current-password"
            />
             {password.error && (
              <Typography color="error" variant="caption" >
                {password.error}
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
            
            <Typography textAlign={"center"} m={"1rem"}>
              OR
              </Typography>

            <Button
            variant='text'
            color='primary'
            onClick={toggleLogin}
            fullWidth>
              Sign Up Instead
              </Button>
          </form>
          </>
          ):
          (
          <>
            <Typography>Sign Up</Typography>
            <form
             style={{
              width:"100%",
              marginTop:"1rem"
            }}
            onSubmit={handleSignUp}
            >
              <Stack 
                 position={"relative"} 
                 width={"10rem"} 
                 margin={"auto"}>
                  <Avatar sx={{
                    width:"10rem",
                    height:"10rem",
                    objectFit:"contain"
                  }} 
                  src={avatar.preview}
                  />
                   
                  <IconButton sx={{
                    position:"absolute",
                    bottom:"0",
                    right:"0",
                    color:"white",
                    bgcolor:"rgba(0,0,0,0.5)",
                    ":hover":{
                      bgcolor:"rgba(0,0,0,0.7)"
                    }
                  }}
                     component="label"
                  >
                    <>
                    <CameraAltIcon/>
                    <VisuallyHiddenInput type="file"  onChange={avatar.changeHandler}/>
                    </>
                  </IconButton>
              </Stack>
                  {avatar.error && (
                      <Typography 
                       m={"1rem auto"}
                       width={"fit-content"}
                       display={"block"}
                       color="error" 
                       variant="caption" >
                        {avatar.error}
                      </Typography>
                    )}
              <TextField 
              required={true}
              fullWidth
              label="Name"
              margin='normal'
              variant='outlined'
              value={name.value}
              onChange={name.changeHandler}
              />
              <TextField 
              required={true}
              fullWidth
              label="Bio"
              margin='normal'
              variant='outlined'
              value={bio.value}
              onChange={bio.changeHandler}

              />
              <TextField 
              required={true}
              fullWidth
              label="Username"
              margin='normal'
              variant='outlined'
              value={userName.value}
              onChange={userName.changeHandler}
               autoComplete="userName"
              />
               {userName.error && (
              <Typography color="error" variant="caption" >
                {userName.error}
              </Typography>
            )}
              <TextField 
              required={true}
              fullWidth
              type='password'
              label="Password"
              margin='normal'
              variant='outlined'
              value={password.value}
              onChange={password.changeHandler}
               autoComplete="current-password"
              />
              {password.error && (
              <Typography color="error" variant="caption" >
                {password.error}
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
                Sign Up
                </Button>
              
              <Typography textAlign={"center"} m={"1rem"}>
                Or
                </Typography>
  
              <Button
              variant='text'
              color='primary'
              onClick={toggleLogin}
              fullWidth>
                Login Instead
                </Button>
            </form>
            </>
          )
          }
      </Paper>
      </Container>
      </div>
  )
}

export default Login