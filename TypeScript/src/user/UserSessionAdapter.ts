import User from "./User";
import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import UserSession from "./UserSession";

export default class UserSessionAdapter {
    public getLoggedInUser(): User {
        const user = UserSession.getLoggedUser();

        if (!user) {
            throw new UserNotLoggedInException();
        }

        return user;
    }
}
