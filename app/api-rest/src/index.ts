import {app} from "./server";

export class Application {
    private constructor() {
    }

    static start() {
        console.log('Application initialized');
        app.listen(3000, () => {
            console.log('Server running at http://localhost:3000');
        });
    }
}