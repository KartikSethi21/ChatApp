import { createContext, useContext, useMemo } from 'react';
import io from 'socket.io-client';
import { server } from './constants/config';


// const socket=io("http://localhost:3000",{
//     withCredentials:true,
//     auth:{
//         token:localStorage.getItem("token")
//     },
// });

const socketContext=createContext();

const getSocket= ()=> useContext(socketContext);

const SocketProvider=({children})=>{ 
    // i do not want socket to get create after every re-render
    const socket=useMemo(()=>io(server,{
            withCredentials:true,
        }),
    [])
    return(
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    );
};



export {getSocket,SocketProvider};


