import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    fullName: {
        type: String,
        required: [true, "Fullname is required"],
        minLength: [4, "Fullname should be atleast 4 characters long"],
        maxLength: [30, "Fullname shoud be less than 30 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    interests: {
        type: [String],
        maxlength: [10, 'Interests array cannot exceed 10 items']
    }
})

const User = models.User || model("User", UserSchema)


export default User