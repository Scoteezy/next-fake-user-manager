import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'
// get one user 

export async function GET(_,res){
    const {id} = await res.params;
    const user = users.filter((u)=>u.id===id);
    return NextResponse.json({user, ok:true},{status:200})


}

// login 
export async function POST(req,res) {
    const {name,email,password} = await req.json();
    const {id} = await res.params;

    const {name: uName,email:uEmail, password: uPassword} = users.find((u)=>u.id ===id)
    if(uName===name && uEmail===email && uPassword===password){
        return NextResponse.json({result: "Success login", ok:true})
    }else if(!name || !email || !password){
        return NextResponse.json({result: "Please fill all inputs", ok: false})

    }else{
        return NextResponse.json({result: "Invalid data", ok: false})

    }
}
//delete 
export async function DELETE(req,res){
    const {id} = await res.params;
    const userIndex = users.findIndex((user)=>user.id===id);
    if(userIndex===-1){
        return NextResponse.json({result: "User not found"}, {status: 404});
    }
    users.splice(userIndex,1)
    const updated = users;
    const updatedData = JSON.stringify(updated, null, 2)
    fs.writeFileSync('./app/util/db.js', `export const users = ${updatedData};`,'utf-8')
    return NextResponse.json({success: "User deleted"}, {status: 200})

}