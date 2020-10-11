export default class StatsCountInvalid extends Error {
  constructor(count: number) {
    super(`Invalid count value: ${count}`);
  }
}
