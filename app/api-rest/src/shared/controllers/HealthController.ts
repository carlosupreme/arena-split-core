import {Controller} from "../Controller";

export class HealthController implements Controller {
    async run(_req: any, res: any): Promise<void> {
        res.send('OK');
    }
}