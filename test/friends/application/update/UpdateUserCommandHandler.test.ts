import {beforeAll, describe, expect, it} from "vitest";
import {UserRepositoryMock} from "../mocks/UserRepositoryMock";
import {InvalidEmailAddressError, UpdateUserCommand, UpdateUserCommandHandler, UUID} from "../../../../src";

let repository: UserRepositoryMock;
let handler: UpdateUserCommandHandler;

beforeAll(() => {
    repository = new UserRepositoryMock();
    handler = new UpdateUserCommandHandler(repository);
});
describe('UpdateUserCommandHandler', async () => {

    it('should update a valid user', async () => {
        const userPrimitive = {
            id: UUID.random().value,
            fullName: 'Carlos',
            email: 'carlos@carlos.com',
            username: 'usernameCarlos'
        }
        const command = new UpdateUserCommand(userPrimitive);

        await handler.handle(command);

        const user = repository.getLastUserUpdated();

        expect(user.toPrimitives()).toEqual(userPrimitive);
    });

    it('should throw a validation error', async () => {
        const userPrimitive = {
            id: UUID.random().value,
            fullName: 'Carlos',
            email: 'invalid email',
            username: 'usernameCarlos'
        }
        const command = new UpdateUserCommand(userPrimitive);

        expect(async () => await handler.handle(command)).rejects.toThrowError(InvalidEmailAddressError);
    });
});