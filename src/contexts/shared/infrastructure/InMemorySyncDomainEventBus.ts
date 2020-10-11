import DomainEventBus from "../domain/DomainEventBus";
import DomainEventSubscriber from "../domain/DomainEventSubscriber";
import DomainEvent from "../domain/DomainEvent";
import DomainEventSubscriberNotExist from "../domain/DomainEventSubscriberNotExist";

/**
 * Simple in memory bus to demonstrate
 * communication between 2 bounded contexts or modules
 *
 * TODO:
 * prevent duplicated subscribers and other improvements
 * also create an async implementation
 *
 */
export default class InMemorySyncDomainEventBus implements DomainEventBus {

    private _subscribers: Map<string, DomainEventSubscriber[]>;

    constructor() {
        this._subscribers = new Map<string, DomainEventSubscriber[]>();
    }

    get subscribers(): Map<string, DomainEventSubscriber[]> {
        return this._subscribers;
    }

    async publish(events: DomainEvent[]) {
        const filteredEvents = events.filter(event => this._subscribers.has(event.getName()));
        const promises = filteredEvents.reduce((acc, event) => {
            acc = [
                ...acc,
                ...this._subscribers.get(event.getName())
                            .map(subscriber => subscriber.consume(event))
            ];
            return acc;
        }, []);

        if(!promises.length) {
            throw new DomainEventSubscriberNotExist(
                events.map(event => event.getName()).join(",")
            )
        }

        // FIXME:
        // an error in one of the promises will break the flow
        // we should handle errors individually
        // or maybe logging them without interrupting the execution
        await Promise.all(promises);
    }

    subscribe(subscriber: DomainEventSubscriber, event: DomainEvent) {
        if(this.subscribers.has(event.getName())) {
            this.subscribers.set(
                event.getName(),
                [
                    ...this.subscribers.get(event.getName()),
                    subscriber,
                ]
            )
        } else {
            this.subscribers.set(
                event.getName(),
                [subscriber]
            )
        }
    }
}