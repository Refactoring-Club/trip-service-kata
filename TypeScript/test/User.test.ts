import "jest";
import BobbyBuilder from "../src/user/BobbyBuilder";
import User from "../src/user/User";

describe("User", () => {
    describe("hasFriend", () => {
        describe("when the user has no friends", () => {
            it('is false', () => {
                const bobby = new User();
                const dorothy = new User();

                expect(bobby.hasFriend(dorothy)).toBe(false);
            });
        });

        describe("when the user has friends", () => {
            describe("when dorothy is a friend", () => {
                it('is true', () => {
                    const dorothy = new User();
                    const bobby = new BobbyBuilder().withFriend(dorothy).create();

                    expect(bobby.hasFriend(dorothy)).toBe(true);
                });
            });
        });
    });
});
