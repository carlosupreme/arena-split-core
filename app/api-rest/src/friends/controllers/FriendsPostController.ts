import {Request, Response} from "express";
import {CommandBus, CreateUserCommand} from "arena-split-core";
import {Controller} from "../../shared/Controller";
import httpStatus from "http-status";

type CreateUserRequest = {
    id: string;
    fullName: string;
    username: string;
    email: string;
};

export class FriendsPostController implements Controller {
    constructor(private readonly commandBus: CommandBus) {
    }

    async run(req: Request<CreateUserRequest>, res: Response) {
        await this.createUser(req);
        res.status(httpStatus.CREATED).send('User created successfully');
    }

    private async createUser(req: Request<CreateUserRequest>) {
        const createUserCommand = new CreateUserCommand({
            id: req.body.id,
            fullName: req.body.fullName,
            email: req.body.email,
            username: req.body.username,
        });

        await this.commandBus.dispatch(createUserCommand);
    }
}