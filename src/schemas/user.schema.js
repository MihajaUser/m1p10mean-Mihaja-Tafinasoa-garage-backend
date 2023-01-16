import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstname: String,
  lastname: Date,
  username: String,
  email: String,
  password: String,
});

const UserModel = model("UserModel", UserSchema);
export { UserModel };
