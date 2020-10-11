import Genially from "../domain/Genially";
import Uuid from "../../../shared/domain/Uuid";
import GeniallyName from "../domain/values/GeniallyName";
import GeniallyDescription from "../domain/values/GeniallyDescription";
import GeniallyRepository from "../domain/GeniallyRepository";

export type CreateGeniallyServiceRequest = {
  id: Uuid;
  name: GeniallyName;
  description: GeniallyDescription;
};

export default class CreateGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const { id, name, description } = req;

    // constructor is now private, we have better control and better semantics with factory methods
    const genially = Genially.create(id, name, description);

    await this.repository.save(genially);

    return genially;
  }
}
