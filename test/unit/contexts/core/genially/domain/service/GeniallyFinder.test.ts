import GeniallyFinder from "../../../../../../../src/contexts/core/genially/domain/service/GeniallyFinder";
import Genially from "../../../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyName from "../../../../../../../src/contexts/core/genially/domain/values/GeniallyName";
import GeniallyDescription from "../../../../../../../src/contexts/core/genially/domain/values/GeniallyDescription";
import GeniallyRepository from "../../../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import Uuid from "../../../../../../../src/contexts/shared/domain/Uuid";

describe("GeniallyFinder", () => {
    const findFn = jest.fn();
    const repository = {
        save: jest.fn(),
        find: findFn,
        delete: jest.fn()
    } as GeniallyRepository;
    const finder = new GeniallyFinder(repository);
    const fakeGenially = Genially.create(new Uuid(), new GeniallyName("fake name"), new GeniallyDescription());

    beforeAll(async () => {
        findFn.mockClear();
    });

    test("should return genially if it exists", async () => {
        // arrange
        findFn.mockReturnValue(fakeGenially);
        // act

        const result = await finder.find(fakeGenially.id);

        // assert
        expect(result).toMatchObject(fakeGenially);

    });

    test("should throw error if genially does not exist", async () => {
        // arrange
        findFn.mockReturnValue(null);

        // act & assert
        await expect(finder.find(fakeGenially.id)).rejects.toThrow(`Genially <${fakeGenially.id.value}> does not exist`);
    });
});