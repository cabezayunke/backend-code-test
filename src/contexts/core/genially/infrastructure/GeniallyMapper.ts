
import {GeniallyDocument} from "./GeniallyModel";
import Genially from "../domain/Genially";

export default interface GeniallyMapper {
    toPersistence(genially: Genially): GeniallyDocument;
    toDomain(model: GeniallyDocument): Genially;
}