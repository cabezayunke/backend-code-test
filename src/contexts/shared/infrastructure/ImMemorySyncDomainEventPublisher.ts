import DomainEvent from "./DomainEvent";
import DomainEventBus from "../domain/DomainEventBus";
import DomainEventPublisher from "../domain/DomainEventPublisher";

export default class InMemorySyncDomainEventPublisher implements DomainEventPublisher {

    constructor(private eventBus: DomainEventBus) {}

    async publish(events: DomainEvent[]): Promise<void> {
        await this.eventBus.publish(events);
    }
}