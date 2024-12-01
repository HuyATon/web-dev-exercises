class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidInputError';
    this.statusCode = 400;
  }
}

export default InvalidInputError