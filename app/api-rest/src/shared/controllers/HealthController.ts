import {Controller} from "../Controller";
import {Request, Response} from "express";

export class HealthController implements Controller {
    async run(_req: Request, res: Response): Promise<void> {
        res.send('OK');
    }
}