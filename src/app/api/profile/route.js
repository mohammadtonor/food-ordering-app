import { authOptions } from "./../auth/[...nextauth]/route";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from './../../../models/User';

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    const updateData = {};
    if ('name' in data) {
        updateData.name = data.name;
    }
    if ('image' in data) {
        updateData.image = data.image;
    }

    if (updateData.keys.length > 0) { 
        response = await User.updateOne({email}, {name: data.name});
    }
    
    return Response.json(response);
}