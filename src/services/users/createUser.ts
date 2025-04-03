import { UserModel, User } from "../../db/users";

const createUser = (values: User) => {
  return new UserModel(values).save().then((user) => user.toObject());
};

export default createUser;
