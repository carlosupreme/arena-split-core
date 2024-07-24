import {describe, expect, it} from "vitest";
import {UserId} from "arena-split-core";

describe("Create User controller", () => {
    const body = {
        fullName: 'John',
        username: 'Maverick',
        id: UserId.create(),
        email: 'test@test.com'
    }

    it('should create an user', async () => {
        const res = await fetch("http://localhost:3000/user", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });

        expect(res.status).toBe(201);
    });
})