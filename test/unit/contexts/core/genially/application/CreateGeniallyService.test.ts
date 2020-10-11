
import CreateGeniallyService from "../../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import GeniallyName from "../../../../../../src/contexts/core/genially/domain/values/GeniallyName";
import GeniallyDescription from "../../../../../../src/contexts/core/genially/domain/values/GeniallyDescription";
import GeniallyTestHelper from "../../../../../shared/GeniallyTestHelper";
import Uuid from "../../../../../../src/contexts/shared/domain/Uuid";
import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";

describe("CreateGeniallyService", () => {
    const saveFn = jest.fn();
    const repository = {
        save: saveFn,
        find: jest.fn(),
        delete: jest.fn()
    } as GeniallyRepository;
    const helper = new GeniallyTestHelper();
    const service = new CreateGeniallyService(repository);
    const data = {
        id: new Uuid(),
        name: new GeniallyName("valid name"),
        description: new GeniallyDescription("valid description"),
    };

    beforeEach(async () => {
        saveFn.mockClear();
    });

    test("should create a valid genially with all fields", async () => {
        // arrange

        // act
        const genially = await service.execute(data);

        // assert
        helper.assertGenially(data, genially);

    });

    test("should handle error from repository", async () => {
        // arrange
        const error = "infrastructure error";
        saveFn.mockImplementation(() => {
            throw new Error(error);
        });

        // act & assert
        await expect(service.execute(data)).rejects.toThrow(error);
    });
    
});