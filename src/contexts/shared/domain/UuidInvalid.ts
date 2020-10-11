export default class UuidInvalid extends Error {
  constructor(id: string) {
    super(`Invalid Uuid param: ${id}`);
  }
}
