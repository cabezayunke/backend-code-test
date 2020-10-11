import GeniallyStats from "../../../../../../src/contexts/analytics/genially/domain/GeniallyStats";
import IncreaseGeniallyCreatedStatsService from "../../../../../../src/contexts/analytics/genially/application/IncreaseGeniallyCreatedStats";
import GeniallyStatsRepository from "../../../../../../src/contexts/analytics/genially/domain/GeniallyStatsRepository";
import StatsCount from "../../../../../../src/contexts/analytics/shared/domain/StatsCount";

describe("IncreaseGeniallyCreatedStatsService", () => {
    const saveFn = jest.fn();
    const repository = {
        save: saveFn,
        find: jest.fn().mockReturnValue(
            new GeniallyStats(
                new StatsCount()
            )
        ),
    } as GeniallyStatsRepository;
    const service = new IncreaseGeniallyCreatedStatsService(repository);

    beforeEach(async () => {
        saveFn.mockClear();
    });

    test("should increase stats count", async () => {
        // arrange

        // act
        const result = await service.execute();

        // assert
        expect(result.count.value).toEqual(1);
    });

    test("should throw infrastructure error", async () => {
        // arrange
        const error = "infrastructure error";
        saveFn.mockImplementation(() => {
            throw new Error(error);
        });

        // act & assert
        await expect(service.execute()).rejects.toThrow(error);
    });
});