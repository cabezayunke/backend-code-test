
import DomainEvent from "../../../../shared/domain/DomainEvent";

const NAME = "core.genially.created";

export default class GeniallyCreated extends DomainEvent {
    constructor(data?: any) {
        super(NAME, data);
    }
}