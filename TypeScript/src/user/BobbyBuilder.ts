import Trip from "../trip/Trip";
import User from "./User";

export default class BobbyBuilder {
    private readonly innerBobby: User;

    public constructor() {
        this.innerBobby = new User();
    }

    public withFriend(friend: User) {
        this.innerBobby.addFriend(friend);
        return this;
    }

    public withTrip(trip: Trip) {
        this.innerBobby.addTrip(trip);
        return this;
    }

    public create() {
        return this.innerBobby;
    }
}
