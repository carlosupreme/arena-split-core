<?php

declare(strict_types=1);

namespace ArenaSplit\User\Domain;

use Carlosupreme\ErrorOr\Error;
use Carlosupreme\ErrorOr\ErrorOr;

final readonly class Password
{
    private function __construct(private string $hashedPassword)
    {
    }

    /**
     * @return ErrorOr<self>
     */
    public static function fromPlainText(string $plainPassword): ErrorOr
    {
        if (!self::isValidPassword($plainPassword)) {
            return ErrorOr::fromError(Error::validation(
                'Password.Length',
                'Password must be at least 8 characters long.'
            ));
        }

        return ErrorOr::fromValue(new self(password_hash($plainPassword, PASSWORD_DEFAULT)));
    }

    /**
     * @return ErrorOr<self>
     */
    public static function fromHashedPassword(string $hashedPassword): ErrorOr
    {
        if (!self::isValidHashedPassword($hashedPassword)) {
            return ErrorOr::fromError(Error::validation(
                'Password.Hash',
                'Invalid hashed password.'
            ));
        }

        return ErrorOr::fromValue(new self($hashedPassword));
    }

    public function verify(string $plainPassword): bool
    {
        return password_verify($plainPassword, $this->hashedPassword);
    }

    public function toString(): string
    {
        return $this->hashedPassword;
    }

    public static function isValidPassword(string $plainPassword): bool
    {
        return strlen($plainPassword) >= 8;
    }

    public static function isValidHashedPassword(string $hashedPassword): bool
    {
        $pattern = '#^\$2[ayb]\$\d{2}\$[./0-9A-Za-z]{53}$#';

        return preg_match($pattern, $hashedPassword) === 1;
    }
}
