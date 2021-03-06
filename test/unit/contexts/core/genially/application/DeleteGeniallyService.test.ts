
import GeniallyName from "../../../../../../src/contexts/core/genially/domain/values/GeniallyName";
import GeniallyDescription from "../../../../../../src/contexts/core/genially/domain/values/GeniallyDescription";
import Uuid from "../../../../../../src/contexts/shared/domain/Uuid";
import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import DeleteGeniallyService from "../../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";

describe("DeleteGeniallyService", () => {
    const deleteFn = jest.fn();
    const findFn = jest.fn();
    const saveFn = jest.fn();
    const repository = {
        save: saveFn,
        find: findFn,
        delete: deleteFn
    } as GeniallyRepository;
    const deleteService = new DeleteGeniallyService(repository);
    const data = {
        id: new Uuid(),
    };
    const fakeGenially = Genially.create(data.id, new GeniallyName("fake name"), new GeniallyDescription());

    beforeEach(async () => {
        deleteFn.mockClear();
        findFn.mockClear();
        saveFn.mockClear();
    });

    test("should delete existing genially", async () => {
        // arrange
        findFn.mockReturnValue(fakeGenially);

        // act
        const id = await deleteService.execute(data);

        // assert
        expect(id).toMatchObject(data.id);
        expect(deleteFn).toHaveBeenCalledTimes(0);
        expect(saveFn).toHaveBeenCalledTimes(1);
    });

    test("should handle error from repository", async () => {
        // arrange
        const error = "infrastructure error";
        saveFn.mockImplementation(() => {
            throw new Error(error);
        });
        findFn.mockReturnValue(fakeGenially);

        // act & assert
        await expect(deleteService.execute(data)).rejects.toThrow(error);
    });

    
});