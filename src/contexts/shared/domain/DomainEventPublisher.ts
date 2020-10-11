import DomainEvent from "./DomainEvent";

export default interface DomainEventPublisher {
    publish(events: DomainEvent[]): Promise<void>;
}