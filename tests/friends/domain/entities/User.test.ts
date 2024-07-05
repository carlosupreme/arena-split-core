import { expect, test, assert } from 'vitest';
import { User } from '../../../../src/friends/domain/entities/User';
import { UserId } from '../../../../src/friends/domain/value-objects/UserId';

test('that user has an id', () => {
  const user = new User(new UserId('123'));

  expect(user.getId().value).toBe('123');
});

test('that user has an id different than other', () => {
  const user = new User(new UserId('123'));
  const user1 = new User(new UserId('456'));

  expect(user.getId().value).toBe('123');
  expect(user1.getId().value).toBe('456');
});

test('that user has an id with length less than 1000 ', () => {
  assert.throws(() => {
    new User(new UserId('x'.repeat(10000)));
  }, 'User id is invalid');
});