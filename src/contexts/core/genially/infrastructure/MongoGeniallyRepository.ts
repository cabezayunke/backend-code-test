import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyModel from './GeniallyModel';
import GeniallyMapper from "./GeniallyMapper";
import MongoGeniallyMapper from "./MongoGeniallyMapper";

export default class MongoGeniallyRepository implements GeniallyRepository {

  private mapper: GeniallyMapper;

  constructor() {
    this.mapper = new MongoGeniallyMapper();
  }

  async save(genially: Genially): Promise<void> {
    const existing = await GeniallyModel.findOne({uid: genially.id.value});
    if(existing) {
        existing.name = genially.name.value;
        existing.description = genially.description.value;
        await existing.save()
    } else {
        const model = this.mapper.toPersistence(genially);
        await model.save();
    }
  }

  async find(id: string): Promise<Genially> {
    const model = await GeniallyModel.findOne({uid: id});
    return model ? this.mapper.toDomain(model) : null;
  }

  async delete(id: string): Promise<void> {
    throw new Error('You should not delete geniallys');
  }
}
