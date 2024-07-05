export class Application {
  private _isRunning: boolean = false;

  get isRunning() {
    return this._isRunning;
  }

  start(): void {
    this._isRunning = true;



    console.log('Application started');
  }
}
