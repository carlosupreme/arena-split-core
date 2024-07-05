import { Application } from './app';
export default async function init(): Promise<Application> {
  const app = new Application();
  app.start();

  return app;
}

