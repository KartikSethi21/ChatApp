import moment from "moment";

const fileFormat=(url="")=>{
    const fileExtention=url.split(".").pop();
    if(fileExtention === "mp4" ||fileExtention === "webm" ||fileExtention === "ogg") 
        return "video";
    
    if(fileExtention === "mp3" ||fileExtention === "wav" ) 
        return "audio";
    
    if(fileExtention === "png" ||fileExtention === "jpg" ||fileExtention === "jpeg" ||fileExtention === "gif") 
        return "image";

    return "file";
};

// upload/drpr_auto/w_200/ to make image to 200px only on click

// const transFormImage=(url="",width=100)=>{

//     const newUrl=url.replace("upload/",`upload/dpr_auto/w_${width}`);

//     return newUrl;
// };

const transFormImage = (url = "", width = 100) => {
    if (!url.includes("upload/")) {
        console.error("Invalid Cloudinary URL:", url);
        return url; // Return the original URL if it's incorrect
    }

    return url.replace(/upload\/?/, `upload/dpr_auto,w_${width}/`);
};

const getLast7Days=()=>{
    const currentDate=moment();
    const last7Days=[];

    for(let i=0;i<7;i++){
        
        // this will give last seven days from today
        // last7Days.unshift(currentDate.format("MMM D"));
        // currentDate.subtract(1,"days");

        // for last days from today
        const dayDate=currentDate.clone().subtract(i,"days");
        const dayName=dayDate.format("dddd");
        last7Days.unshift(dayName);
    }

    return last7Days;
};


// const getOrSaveFromStorag=({key,value,get})=>{
//     if(get) 
//         return localStorage.getItem(key) 
//           ? JSON.parse(localStorage.getItem(key))
//           : null;
//     else localStorage.setItem(key,JSON.stringify(value));
// };


const getOrSaveFromStorage = ({ key, value, get }) => {
    if (get) {
      const item = localStorage.getItem(key);
      try {
        return item && item !== "undefined" ? JSON.parse(item) : null;
      } catch (e) {
        console.warn(`Error parsing JSON from localStorage key "${key}":`, e);
        return null;
      }
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };


export {fileFormat,transFormImage,getLast7Days,getOrSaveFromStorage};