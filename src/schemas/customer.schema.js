import { Schema, model } from "mongoose";

const CustomerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  credentials: {
    password: String,
    roles: [String]
  },
  repairs: [
    {
      is_done: Boolean,
      is_confirmed: Boolean,
      total_amount: Number,
      car: {
        registration_number: String,
        brand: String,
        model: String
      },
      to_do: [
        {
          label: String,
          price: Number,
          started_at: Date,
          done_at: Date
        }
      ]
    }
  ]
});

const CustomerModel = model("Customers", CustomerSchema);
export { CustomerModel };
