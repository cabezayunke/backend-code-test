
import CreateGeniallyService from "../../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import GeniallyName from "../../../../../../src/contexts/core/genially/domain/values/GeniallyName";
import GeniallyDescription from "../../../../../../src/contexts/core/genially/domain/values/GeniallyDescription";
import GeniallyTestHelper from "../../../../../shared/GeniallyTestHelper";
import Uuid from "../../../../../../src/contexts/shared/domain/Uuid";
import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import GeniallyCreated from "../../../../../../src/contexts/core/genially/domain/events/GeniallyCreated";
import DomainEventPublisher from "../../../../../../src/contexts/shared/domain/DomainEventPublisher";

describe("CreateGeniallyService", () => {
    const saveFn = jest.fn();
    const repository = {
        save: saveFn,
        find: jest.fn(),
        delete: jest.fn()
    } as GeniallyRepository;

    const publishFn = jest.fn();
    const publisher = { publish: publishFn } as DomainEventPublisher;

    const helper = new GeniallyTestHelper();
    const service = new CreateGeniallyService(repository, publisher);
    const data = {
        id: new Uuid(),
        name: new GeniallyName("valid name"),
        description: new GeniallyDescription("valid description"),
    };

    beforeEach(async () => {
        saveFn.mockClear();
        publishFn.mockClear();
    });

    test("should create a valid genially with all fields", async () => {
        // arrange

        // act
        const genially = await service.execute(data);

        // assert
        helper.assertGenially(data, genially);

    });

    test('should publish event when genially is created', async () => {
        // arrange

        // act
        const result = await service.execute(data);

        // assert
        expect(publishFn).toHaveBeenCalledTimes(1);
        expect(publishFn).toHaveBeenCalledWith([
            new GeniallyCreated({
                id: result.id.value,
                createdAt: result.createdAt.getTime()
            })
        ])
    });



    test("should handle error from repositorY", async () => {
        // arrange
        const error = "infrastructure error";
        saveFn.mockImplementation(() => {
            throw new Error(error);
        });

        // act & assert
        await expect(service.execute(data)).rejects.toThrow(error);
    });


    test('should not publish event when genially is not created', async () => {
        // arrange
        const error = "infrastructure error";
        saveFn.mockImplementation(() => {
            throw new Error(error);
        });

        // act & assert
        expect(publishFn).toHaveBeenCalledTimes(0);
    });

});