import {server} from "./server";

export class Application {
    private constructor() {
    }

    static start() {
        
        server.listen(3000, () => {
            console.log('Server running at http://localhost:3000');
        });
    }
}
