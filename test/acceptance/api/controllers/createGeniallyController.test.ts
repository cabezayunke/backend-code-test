import supertest from "supertest";
import app from "../../../../src/api/app";
import { v4 as uuid } from "uuid";
import DbConfig from "../../../../src/contexts/shared/infrastructure/DbConfig";
import MongoConnectionManager from "../../../../src/contexts/shared/infrastructure/MongoConnectionManager";
import IntegrationTestHelper from "../../../integration/contexts/shared/infrastructure/IntegrationTestHelper";


describe('createGeniallyController', () => {

    const integrationTestHelper = new IntegrationTestHelper(
        new MongoConnectionManager(DbConfig)
    );
    const postRequest = supertest(app).post("/genially");

    beforeAll(async () => {
        await integrationTestHelper.before();
    });

    afterAll(async () => {
        await integrationTestHelper.after();
    });


    test('should create genially and return 201', async () => {
        // arrange
        const data = {
            id: uuid(),
            name: "test",
            description: "test"
        };

        // act & assert
        await postRequest.send(data).expect(201)

        // TODO
        // we could discuss here whether we want full black box tests
        // or if we are interested in checking whether the resource
        // has actually been created in the DB

    });
});