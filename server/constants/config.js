const corsOption={
        origin:['http://localhost:5173',process.env.CLIENT_URL  ],
        credentials:true,
    
    };


const Chat_Token="ChatToken";


export {corsOption,Chat_Token};