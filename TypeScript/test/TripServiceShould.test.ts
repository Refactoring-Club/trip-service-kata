import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripDAO from "../src/trip/TripDAO";
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

    describe("when dorothy is logged in", () => {
        describe("when bobby has no friends", () => {
            it("returns empty list of trips", () => {
                const dorothy = new User();
                loginUser(dorothy);
                const tripService = new TripService();

                const bobby = new BobbyBuilder().create();
                expect(tripService.getTripsByUser(bobby)).toEqual([]);
            });
        });

        describe("when bobby has friends", () => {
            describe("when dorothy is a friend of bobby's", () => {
                it("returns bobby's trips", () => {
                    const dorothy = new User();
                    const bobbysVacation = new Trip();
                    loginUser(dorothy);

                    const bobby = new BobbyBuilder().withFriend(dorothy).withTrip(bobbysVacation).create();
                    stubDBFind(bobby);

                    const tripService = new TripService();
                    const tripList = tripService.getTripsByUser(bobby);

                    expect(tripList).toEqual([bobbysVacation]);
                });
            });
        });
    });
});

function stubDBFind(user: User) {
    jest.spyOn(TripDAO, "findTripsByUser").mockReturnValue(user.getTrips());
}

function loginUser(user: User) {
    jest.spyOn(UserSession, "getLoggedUser").mockReturnValue(user);
}

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
