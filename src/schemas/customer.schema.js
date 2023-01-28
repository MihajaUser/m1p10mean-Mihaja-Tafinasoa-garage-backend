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
            total_amount: { type: Number, default: 0 },
            total_paid: { type: Number, default: 0 },
            car: {
              registration_number: String,
              brand: String,
              model: String
            },
            to_do: [
              {
                type: new Schema(
                  {
                    status: { type: Boolean, default: false },
                    label: String,
                    price: Number,
                    started_at: Date,
                    done_at: Date
                  },
                  { _id: false }
                )
              }
            ],
            payment: [
              {
                type: new Schema(
                  {
                    amount: Number
                  },
                  {
                    _id: false,
                    timestamps: true
                  }
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
