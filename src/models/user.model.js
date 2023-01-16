import { UserModel } from "../schemas/user.schema.js";

export const insertUserMdl = async (user) => {
  UserModel.create(user, function (err, small) {
    if (err) {
      console.log(err);
    }
    console.log("user saved");
    // saved!
  });
};

export const findCandidateByUsername = async (username) => {
  const user = await UserModel.findOne({ username });
  return user;
};
