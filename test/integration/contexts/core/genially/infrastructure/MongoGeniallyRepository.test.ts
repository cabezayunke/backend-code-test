import IntegrationTestHelper from "../../../shared/infrastructure/IntegrationTestHelper";
import MongoConnectionManager from "../../../../../../src/contexts/shared/infrastructure/MongoConnectionManager";
import MongoGeniallyRepository from "../../../../../../src/contexts/core/genially/infrastructure/MongoGeniallyRepository";
import GeniallyTestHelper from "../../../../../shared/GeniallyTestHelper";
import Uuid from "../../../../../../src/contexts/shared/domain/Uuid";
import GeniallyName from "../../../../../../src/contexts/core/genially/domain/values/GeniallyName";
import GeniallyDescription from "../../../../../../src/contexts/core/genially/domain/values/GeniallyDescription";
import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import DbConfig from "../../../../../../src/contexts/shared/infrastructure/DbConfig";
import GeniallyModel from "../../../../../../src/contexts/core/genially/infrastructure/GeniallyModel";

describe('MongoGeniallyRepository', () => {

    const integrationTestHelper = new IntegrationTestHelper(
        new MongoConnectionManager(DbConfig)
    );
    const repository = new MongoGeniallyRepository();
    const helper = new GeniallyTestHelper();

    beforeAll(async () => {
        await integrationTestHelper.before();
    });

    afterAll(async () => {
        await GeniallyModel.deleteMany({});
        await integrationTestHelper.after();
    });

    test('should save new genially', async () => {
        // arrange
        const genially = Genially.create(
            new Uuid(),
            new GeniallyName('validName'),
            new GeniallyDescription(),
        );

        // act
        await repository.save(genially)

        // assert
        // the assertion here is just that it does not throw an error

    });

    test('should save existing genially', async () => {
        // arrange
        const genially = Genially.create(
            new Uuid(),
            new GeniallyName('validName'),
            new GeniallyDescription(),
        );
        const updated = Genially.create(
            genially.id,
            new GeniallyName('updatedName'),
            new GeniallyDescription(),
        );

        // act
        await repository.save(genially);
        await repository.save(updated);

        // assert
        // the assertion here is just that it does not throw an error
    });

    test('should find genially', async () => {
        // arrange
        const genially = Genially.create(
            new Uuid(),
            new GeniallyName('validName'),
            new GeniallyDescription(),
        );
        await repository.save(genially);

        // act
        const result = await repository.find(genially.id.value);

        // assert
        helper.assertGenially(genially, result);
    });

    test('should not find genially', async () => {
        // arrange

        // act
        const result = await repository.find('fakeId');

        // assert
        expect(result).toBe(null);
    });

    test('should not delete genially', async () => {
        // arrange
        const genially = Genially.create(
            new Uuid(),
            new GeniallyName('validName'),
            new GeniallyDescription(),
        );
        await repository.save(genially);

        // act
        expect(repository.delete(genially.id.value)).rejects.toThrow('You should not delete geniallys');
    });

});