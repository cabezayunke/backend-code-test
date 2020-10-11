export default class DomainEventNameInvalid extends Error {
  constructor(name: string) {
    super(`Invalid domain event name: ${name}. Should have 3 sections separated by dots.`);
  }
}
