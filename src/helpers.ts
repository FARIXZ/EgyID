import { EgyptianNationalId, EgyptianNationalIdOptions } from './egyptian-national-id.js';

/**
 * Validates if the string is a valid Egyptian National ID.
 * @param value - The string to validate.
 * @param options - Optional configuration options.
 * @returns True if the string is a valid Egyptian National ID; otherwise, false.
 */
export function isValidEgyptianNationalId(
  value: string,
  options: EgyptianNationalIdOptions = {}
): boolean {
  return EgyptianNationalId.isValid(value, options);
}

/**
 * Converts the string to an EgyptianNationalId instance if valid.
 * @param value - The string to convert.
 * @param options - Optional configuration options.
 * @returns An EgyptianNationalId instance if valid; otherwise, null.
 */
export function toEgyptianNationalId(
  value: string,
  options: EgyptianNationalIdOptions = {}
): EgyptianNationalId | null {
  return EgyptianNationalId.tryCreate(value, options);
}

/**
 * Tries to parse the string as an Egyptian National ID.
 * @param value - The string to parse.
 * @param options - Optional configuration options.
 * @returns An object with success status and the parsed ID.
 */
export function tryParseAsNationalId(
  value: string,
  options: EgyptianNationalIdOptions = {}
): { success: boolean; nationalId: EgyptianNationalId | null } {
  const nationalId = EgyptianNationalId.tryCreate(value, options);
  return {
    success: nationalId !== null,
    nationalId,
  };
}

/**
 * Validates only the format of the National ID without checking domain rules.
 * @param value - The string to validate.
 * @returns True if the format is valid (14 digits); otherwise, false.
 */
export function hasValidNationalIdFormat(value: string): boolean {
  return EgyptianNationalId.isValidFormat(value);
}

/**
 * Validates the checksum of the National ID.
 * @param value - The National ID to validate.
 * @returns True if the checksum is valid; otherwise, false.
 */
export function hasValidNationalIdChecksum(value: string): boolean {
  return EgyptianNationalId.validateChecksum(value);
}
