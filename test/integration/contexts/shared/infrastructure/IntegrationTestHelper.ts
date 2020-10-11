import DbConnectionManager from "../../../../../src/contexts/shared/infrastructure/DbConnectionManager";
import GeniallyModel from "../../../../../src/contexts/core/genially/infrastructure/GeniallyModel";

export default class IntegrationTestHelper {

    constructor(private connectionManager: DbConnectionManager) {}

    // NOTE: we could also create global fixtures here if needed
    async before() {
        await this.connectionManager.connect();
    }

    async after() {
        await GeniallyModel.deleteMany({});
        await this.connectionManager.disconnect();
    }

}