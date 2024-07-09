import {beforeAll, describe, expect, it} from "vitest";
import {Application} from "../src";

const API_URL = 'http://localhost:3000/';
const BEFORE_ALL_TIMEOUT = 30000; // 30 sec

describe('Request endpoint', () => {
    let response: Response;
    let body: Array<{ [key: string]: unknown }>;

    beforeAll(async () => {
        Application.start();
        response = await fetch(API_URL);
        body = await response.json();
    }, BEFORE_ALL_TIMEOUT);

    it('Should have response status 200', () => {
        expect(response.status).toBe(200);
    });

    it('Should have content-type', () => {
        expect(response.headers.get('Content-Type')).to.have.string('application/json');
    });
});