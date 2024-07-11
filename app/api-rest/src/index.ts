import {Application} from "./app";

try {
    Application.start();
    console.log('Application started');
    
} catch (e) {
    console.log(e);
    process.exit(1);
}
