// Seeders File is for fake data
import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";
// import { Promise } from "mongoose";

const createUser= async (numUsers)=>{
    try {
        
        const userPromise=[];

        for (let i = 0; i < numUsers; i++) {
            const tempUsers= User.create({
                name:faker.person.fullName(),
                userName:faker.internet.username(),
                bio:faker.lorem.sentence(10),
                password:"password", 
                avatar:{
                    url:faker.image.avatar(),
                    public_id:faker.system.fileName(),
                }
            });
            userPromise.push(tempUsers);
        }

            await Promise.all(userPromise);
            console.log("Users Created",numUsers);
            process.exit(1); //To close Server
            
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};


export {createUser};