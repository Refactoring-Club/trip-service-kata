import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSessionAdapter from "../user/UserSessionAdapter";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser: User = new UserSessionAdapter().getLoggedInUser();

        if (user.hasFriend(loggedUser)) {
            tripList = TripDAO.findTripsByUser(user);
        }

        return tripList;
    }
}
