import { Schema, model } from "mongoose";

const CustomerSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    credentials: {
      password: String,
      roles: [String]
    },
    repairs: [
      {
        type: new Schema(
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
                type: new Schema(
                  {
                    status: Boolean,
                    label: String,
                    price: Number,
                    started_at: Date,
                    done_at: Date
                  },
                  { _id: false }
                )
              }
            ]
          },
          { timestamps: true }
        )
      }
    ]
  },
  { timestamps: true }
);

const CustomerModel = model("Customers", CustomerSchema);
export { CustomerModel };
