import "jest";
import BobbyBuilder from "../src/user/BobbyBuilder";
import Trip from "../src/trip/Trip";
import TripDAO from "../src/trip/TripDAO";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
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

            describe("when dorothy is not a friend of bobby's", () => {
                it("returns empty trip list", () => {
                    const dorothy = new User();
                    loginUser(dorothy);
                    const tripService = new TripService();

                    const eleanor = new User();
                    const bobby = new BobbyBuilder().withFriend(eleanor).create();
                    const tripList = tripService.getTripsByUser(bobby);

                    expect(tripList).toEqual([]);
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
