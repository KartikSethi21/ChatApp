

export const SampleChats=[
    {
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"Kartik Sethi",
        _id:"1",
        groupChat:false,
        members:["1","2"],
         },
    {
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"Jatin Sethi",
        _id:"2",
        groupChat:true,
        members:["1","2"],
         },
    ]

    export const sampleUsers=[
        {
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"Kartik Sethi",
            _id:"1",
             },
        {
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"Jatin Sethi",
            _id:"2",
             },
        ];
export const sampleNotification=[
    {
        sender:{
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"Kartik Sethi",
        },
        _id:"1",
         },
    {
        sender:{
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"Jatin Sethi",
        },
        _id:"2",
         },
    ];
        
export const  sampleMesssage=[
    {
        attachments:[
            {
                public_id:"aadvss",
                url:"https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content:"Katik sab yahi chall raha hai ??",
        _id:"dslskcns",
        sender:{
            _id:"user._id",
            name:"Chaman",
        },
        chat:'ChatId',
        createdAt:"2024-02-12T10:41:30.630Z",
    },
    {
        attachments:[
            {
                public_id:"aadvss 2",
                url:"https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content:"Katik2 sab 2yahi chall raha hai ??",
        _id:"dslsks",
        sender:{
            _id:"hsxjsxbn",
            name:"Chama 2",
        },
        chat:'ChatId',
        createdAt:"2024-02-12T10:41:30.630Z",
    },
];

export const dashboardData={
    users:[
        {
        name:"Kartik Sethi",
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        _id:"1",
        userName:"kartik_sethi",
        friends:20,
        groups:5,
        },
        {
            name:"Jatin Sethi",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"2",
            userName:"jatin_sethi",
            friends:20,
            groups:25,

        },
    ],
    chats:[
        {
            name:"Nobody",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"1",
            groupChat:true,
            members:[
                {
                    _id:"1", 
                    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
             
                },
                {
                    _id:"2", 
                    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
             
                },
            ],
            totalMembers:2,
            totalMessages:20,
            creator:{
                name:"Kar se",
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
            }
        },
        {
            name:"To The Greatest",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"2",
            groupChat:true,
            members:[               
                {
                    _id:"1", 
                    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
             
                },
                {
                    _id:"2", 
                    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
             
                },
            ],
            totalMembers:2,
            totalMessages:20,
            creator:{
                name:"Kar se Tip",
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
            }
        },
    ],
    messages:[
        {
            attachments:[],
            content:"Kuch toh ho raha hai",
            _id:"scdcvmxdfm",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Chaman",
            },
            chat:"chatId",
            groupChat:false,
            createdAt:"2024-02-12T10:41:30.630",
        },
        {
            attachments:[
                {
                    public_id:"adsk 2",
                    url:"https://www.w3schools.com/howto/img_avatar.png",
                },
            ],
            content:"",
            _id:"scdccdzkmx.vmxdfm",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Chaman 2",
            },
            chat:"chatId",
            groupChat:true,
            createdAt:"2024-02-12T10:41:30.630",
        },


    ]
};
    