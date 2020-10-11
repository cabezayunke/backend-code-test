import { v4 as uuid, validate as isUuid } from "uuid";
import UuidInvalid from "../../../../../src/contexts/shared/domain/UuidInvalid";
import Uuid from "../../../../../src/contexts/shared/domain/Uuid";

describe("Uuid value object", () => {

    test("should create Uuid if no value is passed", async () => {
        // arrange

        // act
        const id = new Uuid();

        // assert
        expect(id.value).toBeTruthy();
        expect(isUuid(id.value)).toBeTruthy();
    });

    test("should create Uuid with valid uuid string param", async () => {
        // arrange
        const value = uuid();

        // act
        const id = new Uuid(value);

        // assert
        expect(id.value).toMatch(value);
    });

    test("should throw error for invalid uuid string param", async () => {
        // arrange
        expect.assertions(1);

        // act & assert
        expect(() => new Uuid("invalid")).toThrow(UuidInvalid);
    });

});