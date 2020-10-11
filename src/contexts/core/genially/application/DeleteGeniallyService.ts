import Uuid from "../../../shared/domain/Uuid";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyFinder from "../domain/service/GeniallyFinder";

export type DeleteGeniallyServiceRequest = {
    id: Uuid;
};

export default class DeleteGeniallyService {
    // no need to inject this, since it's our own business logic and won't have multiple implementations
    private finder: GeniallyFinder;

    constructor(private repository: GeniallyRepository) {
      this.finder = new GeniallyFinder(repository);
    }

    public async execute(req: DeleteGeniallyServiceRequest): Promise<Uuid> {
        const { id } = req;

        await this.finder.find(id);
        await this.repository.delete(id.value);

        return id;
    }
}
