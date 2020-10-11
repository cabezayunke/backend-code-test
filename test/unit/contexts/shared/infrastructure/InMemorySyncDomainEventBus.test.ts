import InMemorySyncDomainEventBus from "../../../../../src/contexts/shared/infrastructure/InMemorySyncDomainEventBus";
import FakeDomainEvent from "../domain/FakeDomainEvent";
import DomainEventSubscriber from "../../../../../src/contexts/shared/domain/DomainEventSubscriber";


describe('InMemorySyncDomainEventBus', () => {
    let eventBus: InMemorySyncDomainEventBus;

    const consumeFn = jest.fn();
    const fakeSubscriber = { consume: consumeFn } as DomainEventSubscriber;

    beforeEach(async () => {
        consumeFn.mockClear();
        eventBus = new InMemorySyncDomainEventBus();
    });

    test('should add a subscriber for an event that is not registered yet', async () => {
        // arrange
        const event = new FakeDomainEvent();

        // act
        eventBus.subscribe(fakeSubscriber, event);

        // assert
        expect(eventBus.subscribers.size).toEqual(1);
        expect(eventBus.subscribers.get(event.getName())).toHaveLength(1);
    });

    test('should add another subscriber for an event that is already registered yet', async () => {
        // arrange
        const event = new FakeDomainEvent();

        // act
        eventBus.subscribe(fakeSubscriber, event);
        eventBus.subscribe(fakeSubscriber, event);

        // assert
        expect(eventBus.subscribers.size).toEqual(1);
        expect(eventBus.subscribers.get(event.getName())).toHaveLength(2);
    });

    test('should throw an error when publishing events with no subscribers', async () => {
        // arrange
        const event = new FakeDomainEvent();

        // act & assert
        await expect(eventBus.publish([event])).rejects.toThrow('');
    });

    test('should run subscribers when publishing events', async () => {
        // arrange
        const event = new FakeDomainEvent();
        eventBus.subscribe(fakeSubscriber, event);

        // act
        await eventBus.publish([event]);

        // assert
        expect(consumeFn).toHaveBeenCalledTimes(1);
    });
});