import express, {Request, Response} from 'express';
import {InMemorySyncCommandBus} from "./InMemorySyncCommandBus";
import {CreateUserCommand, UserId} from "arena-split-core";

const server = express();
const commandBus = new InMemorySyncCommandBus();

server.use(express.json());

server.get('/', async (_req: Request, res: Response) => {
    
    const command = new CreateUserCommand(UserId.create().value, 'John Doe');
    await commandBus.dispatch(command);

    res.json({
        message: 'Hello World!',
        status: 'ok',
        commandCount: commandBus.getCount()
    });
})

export {server};