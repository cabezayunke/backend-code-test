
import FakeAggregate from "./FakeAggregate";
import FakeDomainEvent from "./FakeDomainEvent";

describe("AggregateRoot", () => {

    test("should add domain event", async () => {
        // arrange
        const aggregate = new FakeAggregate();
        const fakeEvent = new FakeDomainEvent({});

        // act
        aggregate.registerEvent(fakeEvent);

        // assert
        const events = aggregate.pullDomainEvents();
        expect(events).toHaveLength(1);
        expect(events[0]).toMatchObject(fakeEvent);
    });

    test("pull domain event should contain the right data", async () => {
        // arrange
        const aggregate = new FakeAggregate();
        const eventData = {data: "whatever"};
        const fakeEvent = new FakeDomainEvent(eventData);

        // act
        aggregate.registerEvent(fakeEvent);

        // assert
        const events = aggregate.pullDomainEvents();
        expect(events[0].getContents()).toMatchObject(eventData);
    });

    test("should pull all domain events", async () => {
        // arrange
        const aggregate = new FakeAggregate();
        const fakeEvent = new FakeDomainEvent({});

        // act
        aggregate.registerEvent(fakeEvent);
        aggregate.registerEvent(fakeEvent);

        // assert
        const events = aggregate.pullDomainEvents();
        expect(events).toHaveLength(2);
        events.map(e => expect(e).toMatchObject(fakeEvent));
    });

    test("pulling events should reset aggregate domain events", async () => {
        // arrange
        const aggregate = new FakeAggregate();
        const fakeEvent = new FakeDomainEvent({});

        // act
        aggregate.registerEvent(fakeEvent);
        aggregate.registerEvent(fakeEvent);

        // assert
        const events = aggregate.pullDomainEvents();
        expect(events).toHaveLength(2);
        const eventsEmpty = aggregate.pullDomainEvents();
        expect(eventsEmpty).toHaveLength(0);
    });
});