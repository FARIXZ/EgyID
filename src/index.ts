// Main class
export { EgyptianNationalId, EgyptianNationalIdOptions } from './egyptian-national-id.js';

// Enums and constants
export {
  Gender,
  Governorate,
  Region,
  GovernorateArabicNames,
  GovernorateEnglishNames,
  RegionArabicNames,
  RegionEnglishNames,
  GovernorateToRegion,
  ValidGovernorateCodes,
} from './enums.js';

// Errors
export {
  EgyptianNationalIdError,
  InvalidNationalIdFormatError,
  InvalidChecksumError,
  InvalidBirthDateError,
  InvalidGovernorateCodeError,
} from './errors.js';

// Helper functions
export {
  isValidEgyptianNationalId,
  toEgyptianNationalId,
  tryParseAsNationalId,
  hasValidNationalIdFormat,
  hasValidNationalIdChecksum,
} from './helpers.js';
