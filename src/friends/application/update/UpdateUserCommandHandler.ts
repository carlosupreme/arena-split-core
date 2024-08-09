import {CommandHandler} from "../../../shared/application/commands/CommandHandler";

import {Command} from "../../../shared/application/commands/Command";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {UpdateUserCommand} from "./UpdateUserCommand";
import {UserId} from "../../domain/entities/UserId";
import {FullName} from "../../domain/value-objects/FullName";
import {Email} from "../../domain/value-objects/Email";
import {UserName} from "../../domain/value-objects/UserName";
import {User} from "../../domain/entities/User";


export class UpdateUserCommandHandler implements CommandHandler<UpdateUserCommand>{
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository,) {
        this.userRepository = userRepository;
    }

    async handle(command: UpdateUserCommand): Promise<void> {
        const user = new User(new UserId(command.id), new FullName(command.fullName), new Email(command.email), new UserName(command.username));
        await this.userRepository.updateFromId(user);
    }

    subscribedTo(): Command {
        return UpdateUserCommand;
    }

}