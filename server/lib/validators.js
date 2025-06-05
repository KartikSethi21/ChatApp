import { body, check, param, validationResult } from 'express-validator';
import { ErrorHandler } from '../utils/utility.js';


const validateHandler=(req,res,next)=>{
    const errors= validationResult(req);// will provide errors
 //    console.log(errors);
 
    const errorMessages= errors.array().map((error)=>error.msg).join(",");
    // console.log(errorMessages);
 
    if(errors.isEmpty()) return next() ;
    else next(new ErrorHandler(errorMessages,400));
 };
 

const registerValidator =()=>[
    // body(["name","userName","password","bio"]).notEmpty(),
    body("name","Please Enter Name").notEmpty(),
    body("userName","Please Enter UserName").notEmpty(),
    body("password","Please Enter Password").notEmpty(),
    body("bio","Please Enter Bio").notEmpty(),
    
];
 
const loginValidator =()=>[
    body("userName","Please Enter UserName").notEmpty(),
    body("password","Please Enter Password").notEmpty(),
];

const newGroupChatValidator =()=>[
    body("name","Please Enter name").notEmpty(),
    body("members").notEmpty().withMessage("Please Enter members").isArray({min:2,max:100}).withMessage("Members must be 2-100"),
];

const addMemberValidator =()=>[
    body("chatId","Please Enter Chat Id").notEmpty(),
    body("members")
    .notEmpty()
    .withMessage("Please Enter members")
    .isArray({min:1,max:97})
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator =()=>[
    body("chatId","Please Enter Chat Id").notEmpty(),
    body("userId","Please Enter User Id").notEmpty(),
];

const leaveGroupValidator =()=>[
    param("id","Please Enter Chat Id").notEmpty(),
];

const sendAttachmentsValidator =()=>[
    body("chatId","Please Enter Chat Id").notEmpty(),
   
];


const getMessageValidator =()=>[
    param("id","Please Enter Chat Id").notEmpty(),
   
];
const chatIdValidator =()=>[
    param("id","Please Enter Chat Id").notEmpty(), 
];

const renameValidator =()=>[
    param("id","Please Enter Chat Id").notEmpty(),
    body("name","Please Enter name").notEmpty(),
     
];

const sendRequestValidator =()=>[
    body("userId","Please Enter user Id").notEmpty(),    
];

const acceptRequestValidator =()=>[
    body("requestId","Please Enter Request Id").notEmpty(), 
    body("accept")
    .notEmpty()
    .withMessage("Please Add Accept") 
    .isBoolean()
    .withMessage("Accept must be a boolean"),    
];

const adminLoginValidator =()=>[
    body("secretKey","Please Enter Secret Key").notEmpty(),    
];

export { addMemberValidator, chatIdValidator, getMessageValidator, leaveGroupValidator, loginValidator, newGroupChatValidator, registerValidator, removeMemberValidator, sendAttachmentsValidator, validateHandler,renameValidator,sendRequestValidator,acceptRequestValidator,adminLoginValidator };
