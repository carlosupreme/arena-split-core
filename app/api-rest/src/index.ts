import {Application} from "./app";

try {
    Application.start();
} catch (e) {
    console.log(e);
    process.exit(1);
}
