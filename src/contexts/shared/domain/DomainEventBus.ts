import DomainEvent from "./DomainEvent";
import DomainEventSubscriber from "./DomainEventSubscriber";

export default interface DomainEventBus {
    publish(events: DomainEvent[]): Promise<void>;
    subscribe(subscriber: DomainEventSubscriber, event: DomainEvent): void;
}