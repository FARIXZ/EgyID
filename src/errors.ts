/**
 * Base exception class for Egyptian National ID related errors.
 */
export class EgyptianNationalIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EgyptianNationalIdError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Exception thrown when the National ID format is invalid.
 */
export class InvalidNationalIdFormatError extends EgyptianNationalIdError {
  constructor(reason: string) {
    super(reason);
    this.name = 'InvalidNationalIdFormatError';
  }
}

/**
 * Exception thrown when the National ID checksum validation fails.
 */
export class InvalidChecksumError extends EgyptianNationalIdError {
  constructor() {
    super('National ID checksum validation failed. The ID may be invalid or corrupted.');
    this.name = 'InvalidChecksumError';
  }
}

/**
 * Exception thrown when the birth date extracted from the National ID is invalid.
 */
export class InvalidBirthDateError extends EgyptianNationalIdError {
  constructor(reason: string) {
    super(reason);
    this.name = 'InvalidBirthDateError';
  }
}

/**
 * Exception thrown when the governorate code is invalid.
 */
export class InvalidGovernorateCodeError extends EgyptianNationalIdError {
  constructor(code: string) {
    super(`Invalid governorate code: ${code}`);
    this.name = 'InvalidGovernorateCodeError';
  }
}
