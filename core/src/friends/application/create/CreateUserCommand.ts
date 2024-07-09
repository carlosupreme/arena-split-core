import {Command} from "../../../shared/application/commands/Command";

export class CreateUserCommand extends Command {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) {
        super();
    }
}