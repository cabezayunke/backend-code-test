export default class DomainEventSubscriberNotExist extends Error {
  constructor(eventName: string) {
    super(`The given events [${eventName}] have no subscribers`);
  }
}
