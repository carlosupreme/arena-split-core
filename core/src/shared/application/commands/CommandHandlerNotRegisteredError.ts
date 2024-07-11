import {Command} from './Command';

export class CommandHandlerNotRegisteredError extends Error {
    constructor(command: Command) {
        super(`The command <${command.constructor.name}> hasn't a command handler associated`);
    }
}
