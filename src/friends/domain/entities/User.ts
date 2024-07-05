import { UserId } from '../value-objects/UserId';

export class User {
  private readonly id: UserId;

  public constructor(id: UserId) {
    this.id = id;
  }

  getId(): UserId {
    return this.id;
  }
}