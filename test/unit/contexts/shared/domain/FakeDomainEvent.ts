import DomainEvent from "../../../../../src/contexts/shared/domain/DomainEvent";

export default class FakeDomainEvent extends DomainEvent {

    getFullyQualifiedName(): string {
        return "event.fake";
    }

}