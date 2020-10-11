
import DomainEvent from "./DomainEvent";

export default abstract class AggregateRoot {
    domainEvents: DomainEvent[];

    constructor() {
        this.domainEvents = [];
    }

    registerEvent(newEvent: DomainEvent): void {
        this.domainEvents = [...this.domainEvents, newEvent];
    }

    pullDomainEvents(): DomainEvent[] {
        const pulledEvents = [...this.domainEvents];
        this.domainEvents = [];
        return pulledEvents;
    }
}