export class StorageError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'StorageError';
  }
}

export class StorageNotFoundError extends StorageError {
  constructor(key: string, options?: ErrorOptions) {
    super(`Storage object not found: ${key}`, options);
    this.name = 'StorageNotFoundError';
  }
}

export class StorageAlreadyExistsError extends StorageError {
  constructor(key: string, options?: ErrorOptions) {
    super(`Storage object already exists: ${key}`, options);
    this.name = 'StorageAlreadyExistsError';
  }
}

export class StorageInvalidKeyError extends StorageError {
  constructor(reason: string, options?: ErrorOptions) {
    super(`Invalid storage key: ${reason}`, options);
    this.name = 'StorageInvalidKeyError';
  }
}

export class StorageUnavailableError extends StorageError {
  constructor(reason: string, options?: ErrorOptions) {
    super(`Storage backend unavailable: ${reason}`, options);
    this.name = 'StorageUnavailableError';
  }
}

export class StorageIntegrityError extends StorageError {
  constructor(reason: string, options?: ErrorOptions) {
    super(`Storage integrity error: ${reason}`, options);
    this.name = 'StorageIntegrityError';
  }
}
