import {beforeEach, describe, it} from "vitest";
import {UserRepositoryMock} from "../mocks/UserRepositoryMock";
import {EventBusMock} from "../../../shared/domain/events/EventBusMock";
import {CreateUserCommandHandler} from "../../../../src/friends/application/create/CreateUserCommandHandler";
import {CreateUserCommand} from "../../../../src/friends/application/create/CreateUserCommand";
import {UserId} from "../../../../src/friends/domain/entities/UserId";
import {User} from "../../../../src/friends/domain/entities/User";
import {UserCreated} from "../../../../src/friends/domain/events/UserCreated";

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