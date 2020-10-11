export default class GeniallyNameInvalid extends Error {
  constructor(name: string) {
    super(`Invalid genially name: ${name}. Should have between 3 and 20 chars`);
  }
}
