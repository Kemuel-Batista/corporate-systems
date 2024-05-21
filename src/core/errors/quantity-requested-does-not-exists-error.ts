export class QuantityRequestedDoesNotExistsError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}
