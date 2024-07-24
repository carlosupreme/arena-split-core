import {describe, expect, it} from "vitest";

describe('Health controller ', () => {
    it('should starts the application', async () => {
        const res = await fetch('http://localhost:3000/health');
        expect(res.status).toBe(200);
    });
})