import { UserModel } from "../schemas/user.schema";

export const insertUserMdl = async (user) => {
  UserModel.create({ user }, function (err, small) {
    if (err) return;
    console.log("user saved");
    // saved!
  });
};
