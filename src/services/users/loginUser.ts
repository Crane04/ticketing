import getUserByEmail from "./getUserByEmail";
import { authentication, random } from "../../helpers";
import { User } from "../../db/users";

class LoginUser {
  static run = async (
    email: string,
    password: string
  ): Promise<boolean | User> => {
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return false;
    }
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.salt !== expectedHash) {
      return false;
    }
    return user;
  };
}

export default LoginUser;
