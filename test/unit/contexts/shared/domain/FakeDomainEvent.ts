import DomainEvent from "../../../../../src/contexts/shared/domain/DomainEvent";

const NAME = "test.event.fake";

export default class FakeDomainEvent extends DomainEvent {

    constructor(data?: any) {
        super(NAME, data);
    }

}