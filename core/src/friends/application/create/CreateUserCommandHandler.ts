import {CommandHandler} from "../../../shared/application/commands/CommandHandler";
import {CreateUserCommand} from "./CreateUserCommand";
import {UserRepository} from "../../domain/UserRepository";
import {EventBus} from "../../../shared/domain/events/EventBus";
import {User} from "../../domain/User";
import {Command} from "../../../shared/application/commands/Command";
import {UserId} from "../../domain/UserId";

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
    private readonly userRepository: UserRepository;
    private readonly eventBus: EventBus;

    constructor(userRepository: UserRepository, eventBus: EventBus) {
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }

    async handle(command: CreateUserCommand): Promise<void> {
        const user = User.create(new UserId(command.id), command.name);

        await this.userRepository.add(user);

        await this.eventBus.publish(...user.pullDomainEvents());
    }

    subscribedTo(): Command {
        return CreateUserCommand;
    }
}