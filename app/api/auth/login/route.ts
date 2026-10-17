import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
const schema=z.object({email:z.string().email().max(254),password:z.string().min(1).max(200)});
export async function POST(req:Request){try{const parsed=schema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:"Enter a valid email and password."},{status:400});const user=await db.user.findUnique({where:{email:parsed.data.email.toLowerCase()}});if(!user||!user.active||!(await bcrypt.compare(parsed.data.password,user.passwordHash)))return NextResponse.json({error:"Email or password is incorrect."},{status:401});await createSession({id:user.id,name:user.name,email:user.email,role:user.role,organizationId:user.organizationId});await db.auditLog.create({data:{actorId:user.id,action:"LOGIN",entityType:"User",entityId:user.id}});return NextResponse.json({ok:true});}catch{return NextResponse.json({error:"Sign-in service is not ready. Run the setup instructions first."},{status:500});}}