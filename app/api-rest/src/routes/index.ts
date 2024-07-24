import {Router} from 'express';
import {globSync} from 'fast-glob';

export function registerRoutes(router: Router) {
    const routes = globSync(__dirname + '/**/*.route.*');
    routes.map(route => register(route, router));
}

function register(routePath: string, app: Router) {
    import(routePath).then(route => {
        route.register(app);
    });
}
