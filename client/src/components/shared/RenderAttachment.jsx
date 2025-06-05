import React from 'react'
import { transFormImage } from '../../lib/features';
import { FileOpen } from '@mui/icons-material';

function RenderAttachment(file,url) {
    switch(file){
        case "video":
            return <video src={url} preload='none' width={"200px"}  controls/>

        case "image":
            return <img 
            src={transFormImage(url,200)} 
            alt='Attachment'
             width={"200px"} 
             height={"150px"}
             style={{
                objectFit:"contain"
            }}/>;
            
        case "audio":
           return <audio src={url} preload='none'  controls/>;
        
        default:
          return  <FileOpen/>;

    }
}

export default RenderAttachment