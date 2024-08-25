import {CreateUserCommand} from "./CreateUserCommand";
import {CommandHandler} from "../../../shared/application/commands/CommandHandler";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {EventBus} from "../../../shared/domain/events/EventBus";
import {User} from "../../domain/entities/User";
import {Command} from "../../../shared/application/commands/Command";
import {EmailAlreadyTakenError} from "../../domain/errors/EmailAlreadyTakenError";
import {UsernameAlreadyTakenError} from "../../domain/errors/UsernameAlreadyTakenError";
import {UserIdAlreadyTakenError} from "../../domain/errors/UserIdAlreadyTakenError";


export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
    private readonly userRepository: UserRepository;
    private readonly eventBus: EventBus;

    constructor(userRepository: UserRepository, eventBus: EventBus) {
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }

    async handle(command: CreateUserCommand): Promise<void> {
        const user = User.create(command.toPrimitives());
        await this.ensureIsNewUser(user);

        await this.userRepository.add(user);

        await this.eventBus.publish(...user.pullDomainEvents());
    }

    private async ensureIsNewUser(user: User) {
        const [userIdTaken,emailTaken, usernameTaken] = await Promise.all([
            this.userRepository.findById(user.id),
            this.userRepository.findByEmail(user.getEmail()),
            this.userRepository.findByUsername(user.getUsername()),
        ]);

        if (userIdTaken) {
            throw new UserIdAlreadyTakenError(user.id.value);
        }

        if (emailTaken) {
            throw new EmailAlreadyTakenError(user.getEmail().value);
        }

        if (usernameTaken) {
            throw new UsernameAlreadyTakenError(user.getUsername().value);
        }
    }

    subscribedTo(): Command {
        return CreateUserCommand;
    }
}