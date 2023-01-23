import { Schema, model } from "mongoose";

const UserSchema = new Schema({});

const UserModel = model("UserModel", UserSchema);
export { UserModel };
