import { Schema, model } from "mongoose";

const CustomerSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    credentials: {
      password: { type: String, required: true },
      roles: [{ type: String, required: true }]
    },
    repairs: [
      {
        type: new Schema(
          {
            is_done: { type: Boolean, default: false, required: true },
            is_confirmed: { type: Boolean, default: false, required: true },
            is_retrieved: { type: Boolean, default: false, required: true },
            total_amount: { type: Number, required: true, default: 0 },
            total_paid: { type: Number, required: true, default: 0 },
            car: {
              registration_number: { type: String, required: true },
              brand: { type: String, required: true },
              model: { type: String, required: true }
            },
            to_do: [
              {
                type: new Schema(
                  {
                    status: { type: Boolean, default: false },
                    label: { type: String, required: true },
                    price: { type: Number, required: true },
                    started_at: { type: Date, required: true },
                    done_at: { type: Date, required: true }
                  },
                  { _id: true }
                )
              }
            ],
            payment: [
              {
                type: new Schema(
                  {
                    status: { type: Boolean, required: true, default: true },
                    amount: { type: Number, required: true }
                  },
                  {
                    _id: true,
                    timestamps: false
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
