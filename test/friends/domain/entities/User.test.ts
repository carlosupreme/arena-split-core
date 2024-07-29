import {describe, expect, it} from "vitest";
import {User, Uuid} from "../../../../src";
import {InvalidEmailAddressError} from "../../../../src/friends/domain/errors/InvalidEmailAddressError";
import {InvalidFullNameError} from "../../../../src/friends/domain/errors/InvalidFullNameError";

const userPrimitive = {
    id: Uuid.random().value,
    username: "username",
    fullName: "full Name",
    email: "email@valid.com"
};

describe("User", () => {
    it('should create an user with primitive values', () => {
        const user = User.create(userPrimitive);

        expect(user.toPrimitives()).toEqual(userPrimitive);

        expect(user.id.value).toBe(userPrimitive.id);
        expect(user.getEmail().value).toBe(userPrimitive.email);
        expect(user.getFullName().value).toBe(userPrimitive.fullName);
        expect(user.getUsername().value).toBe(userPrimitive.username);
    });

    it('should create a user with a UserCreated domain event', () => {
        const user = User.create(userPrimitive);
        const userDomainEvents = user.pullDomainEvents();

        expect(userDomainEvents.length).toBe(1);
        expect(userDomainEvents[0].eventName).toBe('user.created');
        expect(userDomainEvents[0].entityId).toBe(userPrimitive.id);
        expect(userDomainEvents[0].toPrimitives()).toEqual({user: userPrimitive});
    });

    it('should validate the email', () => {
        const invalidEmail = "invalid";
        expect(() => {
            User.create({...userPrimitive, email: invalidEmail});
        }).toThrowError(InvalidEmailAddressError);
    });

    it('should validate full name with min 3 chars', () => {
        const invalidFullName = "a#";

        const id = Uuid.random().value;
        const email = "email@valido.com";
        const username = "username";

        expect(() => {
            User.create({id, username, email, fullName: invalidFullName});
        }).toThrowError(InvalidFullNameError);

    });




})