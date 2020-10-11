import DomainEventNameInvalid from "../../../../../src/contexts/shared/domain/DomainEventNameInvalid";
import DomainEventName from "../../../../../src/contexts/shared/domain/DomainEventName";

describe("DomainEventName value object", () => {

    test("should throw error for invalid name", async () => {
        // act & assert
        expect(() => new DomainEventName("invalidName")).toThrow(DomainEventNameInvalid);
    });

    test("should create DomainEventName with valid value", async () => {
        // arrange
        const value = "test.fake.event";

        // act
        const eventName = new DomainEventName(value);

        // assert
        expect(eventName.value).toMatch(value);
    });

});