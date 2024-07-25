import {CreateUserCommand} from "./CreateUserCommand";
import {CommandHandler} from "../../../shared/application/commands/CommandHandler";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {EventBus} from "../../../shared/domain/events/EventBus";
import {User} from "../../domain/entities/User";
import {Command} from "../../../shared/application/commands/Command";


export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
    private readonly userRepository: UserRepository;
    private readonly eventBus: EventBus;

    constructor(userRepository: UserRepository, eventBus: EventBus) {
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }

    async handle(command: CreateUserCommand): Promise<void> {
        const user = User.create(command.toPrimitives());

        await this.userRepository.add(user);

        await this.eventBus.publish(...user.pullDomainEvents());
    }

    subscribedTo(): Command {
        return CreateUserCommand;
    }
}