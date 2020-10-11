import Genially from "../domain/Genially";
import Uuid from "../../../shared/domain/Uuid";
import GeniallyName from "../domain/values/GeniallyName";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyFinder from "../domain/service/GeniallyFinder";

export type RenameGeniallyServiceRequest = {
    id: Uuid;
    newName: GeniallyName;
};

export default class RenameGeniallyService {
    // no need to inject this, since it's our own business logic and won't have multiple implementations
    private finder: GeniallyFinder;

    constructor(private repository: GeniallyRepository) {
        this.finder = new GeniallyFinder(repository);
    }

    public async execute(req: RenameGeniallyServiceRequest): Promise<Genially> {
        const { id, newName } = req;

        const existingGenially = await this.finder.find(id);
        existingGenially.updateName(newName);

        await this.repository.save(existingGenially);

        return existingGenially;
    }
}
