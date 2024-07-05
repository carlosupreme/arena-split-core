export class UserId {
  private readonly _value: string;

  constructor(value: string) {
    this.validate(value);
    this._value = value;
  }

  private validate(value: string): void {
    if (!value) {
      throw new Error('User id is required');
    }

    if (value.length > 36) {
      throw new Error('User id is invalid');
    }
  }

  get value(): string {
    return this._value;
  }
}