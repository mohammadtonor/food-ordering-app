import { UserInfo } from "@/src/models/UserInfo";
import clientPromise from '@/src/libs/mongoConnect';
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from '@/src/models/User';
import NextAuth, {getServerSession, AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

export const authOptions:AuthOptions = {
    secret: process.env.SECRET,
    //adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Invalid credentials');
          }
          const email = credentials?.username;
          const password = credentials?.password;
  
          mongoose.connect(process.env.MONGO_URL!);
          const user = await User.findOne({email});
          const passwordOk = user && bcrypt.compareSync(password, user.password);
          
          if (passwordOk) {
            return user;
          }
  
          return null
        }
      })
    ],
  };
  
  export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return false;
    }
    const userInfo = await UserInfo.findOne({email:userEmail});
    if (!userInfo) {
      return false;
    }
    return userInfo.admin;
  }
  
export default NextAuth(authOptions);
  
