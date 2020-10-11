import StatsCount from "../../../../../../src/contexts/analytics/shared/domain/StatsCount";
import StatsCountInvalid from "../../../../../../src/contexts/analytics/shared/domain/StatsCountInvalid";

describe("StatsCount", () => {
    test("should create StatsCount with no value", async () => {
        // arrange

        // act
        const stats = new StatsCount();

        // assert
        expect(stats.value).toEqual(0);
    });

    test("should create StatsCount with valid value", async () => {
        // arrange

        // act
        const stats = new StatsCount(5);

        // assert
        expect(stats.value).toEqual(5);
    });

    test("should not create StatsCount with invalid value", async () => {
        // arrange

        // act & assert
        expect(() => new StatsCount(-1)).toThrow(StatsCountInvalid);
    });

    test("should increase the value by 1", async () => {
        // arrange

        // act
        const stats = new StatsCount();
        stats.increase();

        // assert
        expect(stats.value).toEqual(1);
    });
});