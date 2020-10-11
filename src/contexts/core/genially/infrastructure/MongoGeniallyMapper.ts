
import GeniallyMapper from "./GeniallyMapper";
import GeniallyModel, {GeniallyDocument} from "./GeniallyModel";
import Genially from "../domain/Genially";
import Uuid from "../../../shared/domain/Uuid";
import GeniallyName from "../domain/values/GeniallyName";
import GeniallyDescription from "../domain/values/GeniallyDescription";

export default class MongoGeniallyMapper implements GeniallyMapper {

    toPersistence(genially: Genially): GeniallyDocument {
        return new GeniallyModel({
            uid: genially.id.value,
            name: genially.name.value,
            description: genially.description.value,
            createdAt: genially.createdAt,
            modifiedAt: genially.modifiedAt,
            deletedAt: genially.deletedAt,
        });
    }

    toDomain(model: GeniallyDocument): Genially {
        // no factory method here since we are retrieving values from DB
        return new Genially(
            new Uuid(model.uid),
            new GeniallyName(model.name),
            new GeniallyDescription(model.description),
            model.createdAt,
        );
    }
}