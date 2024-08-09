import {Command} from "../../../shared/application/commands/Command";
import {UserPrimitive} from "../../domain/entities/User";

export class UpdateUserCommand extends Command {
    public readonly id: string;
    public readonly fullName: string;
    public readonly email: string;
    public readonly username: string;

    constructor(data: UserPrimitive) {
        super();
        const {id, fullName, email, username} = data;
        this.id = id;
        this.fullName = fullName
        this.email = email;
        this.username = username;
    }

    toPrimitives(): UserPrimitive {
        return {
            id: this.id,
            fullName: this.fullName,
            email: this.email,
            username: this.username
        }
    }
}