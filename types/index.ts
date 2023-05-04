import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
    _id: string
    email: string
    fullName: string
    interests: string[]
}

export interface LoginUserParams {
    email: string;
    password: string;
}