 import { db } from "@/lib/db";
 import { NextResponse } from "next/server";
 import {hash} from "bcrypt";
// // import * as z from "zod"

 export async function POST(req:Request){


   try{
        const body = await req.json();

       const {email, password,username}= body;
// check unique email
const uniqueEmail= await db.user.findUnique({where:{email:email}})
if(uniqueEmail){
  return NextResponse.json({user:null, message:"Kindly enter Unique Email"},{status:409})

 }
// // check unique username

const uniqueUN= await db.user.findUnique({where:{username:username}})
if(uniqueUN){
  return NextResponse.json({user:null, message:"Kindly enter Unique UserName"},{status:409})

}

//encrypt password

const epassW= await hash(password,6)

 const newUser = await db.user.create({data:{email, password:epassW,username}})
 return NextResponse.json(body)

     }
    catch(error){}

}