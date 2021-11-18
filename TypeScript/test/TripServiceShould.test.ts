import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";

describe("TripServiceShould", () => {
    afterEach(() => { jest.resetAllMocks(); } );

    describe("when dorothy is not logged in", () => {
        it("throws not logged in exception", () => {
            jest.spyOn(UserSession, "getLoggedUser").mockReturnValue(null);

            const tripService = new TripService();

            const bobby = new BobbyBuilder().create();
            expect(() => tripService.getTripsByUser(bobby)).toThrow(UserNotLoggedInException);
        });
    });
});

class BobbyBuilder {
    private readonly innerBobby: User;

    public constructor() {
        this.innerBobby = new User();
    }

    public withFriend(friend: User) {
        this.innerBobby.addFriend(friend);
        return this;
    }

    public withTrip(trip: Trip) {
        // this.innerBobby.addTrip(trip);
        return this;
    }

    public create() {
        return this.innerBobby;
    }
}
