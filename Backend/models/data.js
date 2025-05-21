import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const Users = new mongoose.model("User", userSchema)