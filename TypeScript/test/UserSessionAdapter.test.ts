import "jest";
import BobbyBuilder from "../src/user/BobbyBuilder";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import UserSession from "../src/user/UserSession";
import UserSessionAdapter from "../src/user/UserSessionAdapter";

describe("UserSessionAdapter", () => {
    describe("getLoggedInUser", () => {
        describe("when a logged in user exists", () => {
            it("returns the logged in user!", () => {
                const bobby = new BobbyBuilder().create();
                jest.spyOn(UserSession, "getLoggedUser").mockReturnValue(bobby);

                const userSessionAdapter = new UserSessionAdapter();

                expect(userSessionAdapter.getLoggedInUser()).toEqual(bobby)
            });
        });

        describe("when no logged in user exists", () => {
            it("throws an exception", () => {
                jest.spyOn(UserSession, "getLoggedUser").mockReturnValue(null);

                const userSessionAdapter = new UserSessionAdapter();

                expect(() => userSessionAdapter.getLoggedInUser()).toThrow(UserNotLoggedInException)
            });
        });
    });
});
