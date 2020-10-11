
import GeniallyName from "../../../../../../src/contexts/core/genially/domain/values/GeniallyName";
import GeniallyDescription from "../../../../../../src/contexts/core/genially/domain/values/GeniallyDescription";
import Uuid from "../../../../../../src/contexts/shared/domain/Uuid";
import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import RenameGeniallyService from "../../../../../../src/contexts/core/genially/application/RenameGeniallyService";
import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";

describe("RenameGeniallyService", () => {
    const findFn = jest.fn();
    const saveFn = jest.fn();
    const repository = {
        save: saveFn,
        find: findFn,
        delete: jest.fn(),
    } as GeniallyRepository;
    const renameService = new RenameGeniallyService(repository);
    const renameData = {
        id: new Uuid(),
        newName: new GeniallyName("new name")
    };
    const fakeGenially = Genially.create(renameData.id, new GeniallyName("fake name"), new GeniallyDescription());

    beforeEach(async () => {
        findFn.mockClear();
        saveFn.mockClear();
    });

    test("should rename existing genially", async () => {
        // arrange
        findFn.mockReturnValue(fakeGenially);

        // act
        const updatedGenially = await renameService.execute(renameData);

        // assert
        expect(updatedGenially.name).toMatchObject(renameData.newName);
    });

    test("should handle error from repository", async () => {
        // arrange
        const error = "infrastructure error";
        saveFn.mockImplementation(() => {
            throw new Error(error);
        });
        findFn.mockReturnValue(fakeGenially);

        // act & assert
        await expect(renameService.execute(renameData)).rejects.toThrow(error);
    });


});