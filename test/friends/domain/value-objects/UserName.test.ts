import {describe, expect, it} from "vitest";
import {InvalidUserNameError} from "../../../../src/friends/domain/errors/InvalidUserNameError";
import {UserName} from "../../../../src/friends/domain/value-objects/UserName";


describe("UserName", () => {


    it("Should throw an error with UserName with spaces ", () => {
        const userName="juancho negro";
        expect(()=>{
            new UserName(userName);
        }).toThrowError(InvalidUserNameError);
    });
    it ("should acept '.'",()=>{
       const validUserName='cola.'
       const userName=new UserName(validUserName);
       expect(userName.value).toBe(validUserName);
    });
























})