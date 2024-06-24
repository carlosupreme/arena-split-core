<?php

namespace Tests\Unit;

use ArenaSplit\User\Domain\Password;
use PHPUnit\Framework\TestCase;

class PasswordTest extends TestCase
{
    public function testCanCreatePasswordFromPlainText(): void
    {
        $plainPassword = 'SecurePassword123';
        $result = Password::fromPlainText($plainPassword);

        $this->assertFalse($result->isError());
        $password = $result->getValue();
        $this->assertInstanceOf(Password::class, $password);
        $this->assertTrue($password->verify($plainPassword));
    }

    public function testCannotCreatePasswordFromInvalidPlainText(): void
    {
        $result = Password::fromPlainText('short');
        $this->assertTrue($result->isError());
        $this->assertEquals('Password must be at least 8 characters long.', $result->getFirstError()->getDescription());
    }

    public function testCanCreatePasswordFromHashedPassword(): void
    {
        $plainPassword = 'SecurePassword123';
        $result = Password::fromPlainText($plainPassword);
        $hashedPassword = $result->getValue()->toString();

        $resultFromHash = Password::fromHashedPassword($hashedPassword);

        $this->assertFalse($resultFromHash->isError());
        $passwordFromHash = $resultFromHash->getValue();
        $this->assertInstanceOf(Password::class, $passwordFromHash);
        $this->assertTrue($passwordFromHash->verify($plainPassword));
    }

    public function testCannotCreatePasswordFromInvalidHashedPassword(): void
    {
        $result = Password::fromHashedPassword('invalidhash');

        $this->assertTrue($result->isError());
        $this->assertEquals('Invalid hashed password.', $result->getFirstError()->getDescription());
    }

    public function testPasswordVerification(): void
    {
        $plainPassword = 'SecurePassword123';
        $result = Password::fromPlainText($plainPassword);

        $password = $result->getValue();
        $this->assertTrue($password->verify($plainPassword));
        $this->assertFalse($password->verify('WrongPassword'));
    }
}
