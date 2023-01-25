import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  roles: [String]
});

const UserModel = model("users", UserSchema);
export { UserModel };
