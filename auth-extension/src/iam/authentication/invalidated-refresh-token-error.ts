export class InvalidatedRefreshTokenError extends Error {
  constructor(public readonly message: string = "Refresh token wrong") {
    super(message);
    this.name = 'InvalidatedRefreshTokenError';
  }
}
