
import GeniallyRepository from "../GeniallyRepository";
import GeniallyNotExist from "../errors/GeniallyNotExist";
import Genially from "../Genially";
import Uuid from "../../../../shared/domain/Uuid";

/**
 * We encapsulate this bit of logic as a domain service
 * to reuse in multiple application services
 */
export default class GeniallyFinder {
    constructor(private repository: GeniallyRepository) {}

    async find(id: Uuid): Promise<Genially> {
        const genially = await this.repository.find(id.value);
        if(!genially) {
            throw new GeniallyNotExist(id.value);
        }
        return genially;
    }
}