import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotification } from '../../constants/sampleData'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { useErrors } from '../../hook/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

function Notifications() {
  const {isNotification}=useSelector((state)=>state.misc);
  const dispatch=useDispatch();

  const {isLoading,data,error,isError}=useGetNotificationsQuery();
  const [acceptRequest]=useAcceptFriendRequestMutation();

  const friendRequestHandler=async ({_id,accept})=>{
    // add friend request handler
    dispatch(setIsNotification(false));
    try {
      const res=await acceptRequest({requestId:_id,accept});
      if(res.data?.success){
        // 
        console.log("Use Socket Here");
        toast.success(res.data?.message);
      }else{
        toast.error(res.data?.arror || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong ");
      
    }

  };

  const closeHandler=()=>dispatch(setIsNotification(false));

  useErrors([{error,isError}]);
  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{xs:"1rem",sm:"2rem"} } maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading ?(
          <Skeleton/>
        ):(
          <>
          {
            data?.allRequests.length>0 ?(
              data?.allRequests.map((i)=><NotificationItem 
              sender={i.sender} 
              _id={i._id}
              key={i._id}
              handler={friendRequestHandler}
              />)
            ):
            (
            <Typography textAlign={"center"}>
             0 Notification
            </Typography>
            )
          }
          </>
        )
        }
      </Stack>
    </Dialog>
  )
};

const NotificationItem=memo(({sender,_id,handler})=>{
  const {name,avatar}=sender;
  return (
  <>
    <ListItem>
        <Stack 
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        >
            <Avatar src={avatar}/>
            <Typography
            variant='body1'
            sx={{
                flexGlow:1,
                display:"-webkit-box",
                WebkitLineClamp:1,
                WebkitBoxOrient:"vertical",
                overflow:"hidden",
                textOverflow:"ellipsis",
                // bgcolor:"red",
                width:"100%",    
            }}>
                {`${name} sent you a friend request.`}
            </Typography>
           <Stack direction={{
            xs:"column",
            sm:"row"
            }}>
            <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
            <Button onClick={()=>handler({_id,accept:false})} color='error'>Reject</Button>
           </Stack>
        </Stack>
    </ListItem>
  </>
  );
})

export default Notifications