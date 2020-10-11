import DomainEvent from "../../../../../src/contexts/shared/domain/DomainEvent";

export default class FakeDomainEvent extends DomainEvent {

    constructor(data?: any) {
        super(data);
    }

    getName(): string {
        return "test.event.fake";
    }

}