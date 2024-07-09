import {describe, it, beforeEach} from "vitest";
import {CreateUserCommandHandler} from "../../../../src/friends/application/create/CreateUserCommandHandler";
import {UserRepositoryMock} from "../mocks/UserRepositoryMock";
import {EventBusMock} from "../../../shared/domain/events/EventBusMock";
import {CreateUserCommand} from "../../../../src/friends/application/create/CreateUserCommand";
import {User} from "../../../../src/friends/domain/User";
import {UserId} from "../../../../src/friends/domain/UserId";
import {UserCreated} from "../../../../src/friends/domain/UserCreated";

let repository: UserRepositoryMock;
let eventBus: EventBusMock;
let handler: CreateUserCommandHandler;

beforeEach(() => {
    repository = new UserRepositoryMock();
    eventBus = new EventBusMock();
    handler = new CreateUserCommandHandler(repository, eventBus);
});

describe('RegisterUserCommandHandler', () => {

    it('should create a valid user', async () => {
        const userId = UserId.create();
        const command = new CreateUserCommand(userId.value, "Carlos");
        const user = new User(userId, command.name);
        const domainEvent = new UserCreated({
            name: user.getName(),
            entityId: user.id.value
        });

        await handler.handle(command);

        repository.assertSaveHaveBeenCalledWith(user);
        eventBus.assertLastPublishedEventIs(domainEvent);
    });
});