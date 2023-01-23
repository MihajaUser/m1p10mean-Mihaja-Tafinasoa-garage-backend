import { Schema, model } from "mongoose";

const CustomerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  credentials: {
    password: String,
    roles: [String],
  },
});

const CustomerModel = model("Customers", CustomerSchema);
export { CustomerModel };
