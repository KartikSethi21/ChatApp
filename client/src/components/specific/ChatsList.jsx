import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'
import { bgGradient } from '../../constants/color';

function ChatsList({
  w="100%",
  chats=[],
  chatId,
  onlineUsers=[],
  handleDeleteChat,
  newMessagesAlert=[{
    chatId:"",
    count:0,
    },],
}) {
return (
 
      <Stack width={w} direction={"column"}
      overflow={"auto"} height={"100%"}
      // sx={{
      //   overflow:"auto",
      //   '&::-webkit-scrollbar': {
      //     display: 'none',
      //   },
      //   '-ms-overflow-style': 'none',
      //   'scrollbar-width': 'none',  
        
      // }}
      >
          {
              chats?.map((data,index)=>{
                const {avatar,_id,name,groupChat,members}=data;
                const newMsgAlert=newMessagesAlert.find(
                  ({chatId})=>chatId === _id );
                const isOnline=members?.some((member)=>onlineUsers.includes(member));
                
                return <ChatItem
                  index={index} 
                  newMessageAlert={newMsgAlert} 
                  isOnline={isOnline}
                  avatar={avatar}
                  name={name}
                  _id={_id}
                  key={_id}
                  groupChat={groupChat}
                  sameSender={chatId ===_id}
                  handleDeleteChat={handleDeleteChat}
                  />
              })
          }
      </Stack>
  
)
}
export default ChatsList