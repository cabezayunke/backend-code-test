export default class GeniallyDescriptionInvalid extends Error {
  constructor(description: string) {
    super(`Invalid genially description: ${description}. Should have 125 max`);
  }
}
