import {
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

import {
  EgyptianNationalIdError,
  InvalidNationalIdFormatError,
  InvalidChecksumError,
  InvalidBirthDateError,
  InvalidGovernorateCodeError,
} from './errors.js';

// Constants
const CENTURY_DIGIT_INDEX = 0;
const BIRTH_YEAR_START_INDEX = 1;
const BIRTH_MONTH_START_INDEX = 3;
const BIRTH_DAY_START_INDEX = 5;
const GOVERNORATE_CODE_START_INDEX = 7;
const SERIAL_START_INDEX = 9;
const SERIAL_LENGTH = 4;
const GENDER_DIGIT_INDEX = 12;
const FIRST_ISSUE_AGE = 16;
const VALIDITY_PERIOD_YEARS = 7;
const VALIDITY_PERIOD_CHANGE_YEAR = 2021;

// Checksum weights for validation (first 13 digits)
const CHECKSUM_WEIGHTS = [2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

/**
 * Options for creating an EgyptianNationalId instance.
 */
export interface EgyptianNationalIdOptions {
  /**
   * Whether to validate the 14th checksum digit.
   * Default is FALSE because the official algorithm is not publicly documented.
   * Set to TRUE only if you have the verified algorithm.
   */
  validateChecksum?: boolean;
}

/**
 * Represents an Egyptian National ID and provides functionality to extract
 * personal information such as birth date, age, gender, and governorate.
 */
export class EgyptianNationalId {
  /** The original 14-digit National ID value. */
  readonly value: string;

  /** The birth date extracted from the National ID. */
  readonly birthDate: Date;

  /** The governorate code extracted from the National ID. */
  readonly governorateCode: number;

  /** The governorate extracted from the National ID. */
  readonly governorate: Governorate;

  /** The serial number part of the National ID. */
  readonly serialNumber: number;

  /** The gender extracted from the National ID. */
  readonly gender: Gender;

  /**
   * Creates a new EgyptianNationalId instance.
   * @param value - The 14-digit Egyptian National ID.
   * @param options - Optional configuration options.
   * @throws {InvalidNationalIdFormatError} When the National ID format is invalid.
   * @throws {InvalidChecksumError} When validateChecksum is true and the checksum is invalid.
   * @throws {InvalidBirthDateError} When the birth date in the ID is invalid.
   * @throws {InvalidGovernorateCodeError} When the governorate code is invalid.
   */
  constructor(value: string, options: EgyptianNationalIdOptions = {}) {
    const { validateChecksum = false } = options;

    if (!EgyptianNationalId.isValidFormat(value)) {
      throw new InvalidNationalIdFormatError(
        'National ID must be exactly 14 digits long and contain digits only.'
      );
    }

    if (validateChecksum && !EgyptianNationalId.validateChecksum(value)) {
      throw new InvalidChecksumError();
    }

    this.value = value;
    this.birthDate = this.parseBirthDate();
    this.governorateCode = this.parseGovernorateCode();
    this.governorate = this.parseGovernorate();
    this.serialNumber = this.parseSerialNumber();
    this.gender = this.parseGender();
  }

  // ==================== Static Validation Methods ====================

  /**
   * Validates the format of an Egyptian National ID.
   * @param value - The National ID to validate.
   * @returns True if the format is valid.
   */
  static isValidFormat(value: string | null | undefined): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }

    if (value.length !== 14) {
      return false;
    }

    for (const char of value) {
      if (char < '0' || char > '9') {
        return false;
      }
    }

    return true;
  }

  /**
   * Validates the checksum digit of an Egyptian National ID.
   * @param value - The National ID to validate.
   * @returns True if the checksum is valid; otherwise, false.
   */
  static validateChecksum(value: string): boolean {
    if (!EgyptianNationalId.isValidFormat(value)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 13; i++) {
      const digit = parseInt(value[i], 10);
      sum += digit * CHECKSUM_WEIGHTS[i];
    }

    const calculatedChecksum = sum % 10;
    const providedChecksum = parseInt(value[13], 10);

    return calculatedChecksum === providedChecksum;
  }

  /**
   * Determines whether the provided value represents a valid Egyptian National ID.
   * @param value - The National ID value to validate.
   * @param options - Optional configuration options.
   * @returns True if the value is a valid Egyptian National ID; otherwise, false.
   */
  static isValid(value: string, options: EgyptianNationalIdOptions = {}): boolean {
    return EgyptianNationalId.tryCreate(value, options) !== null;
  }

  /**
   * Tries to create a valid EgyptianNationalId instance without throwing exceptions.
   * @param value - The Egyptian National ID value to validate and parse.
   * @param options - Optional configuration options.
   * @returns An EgyptianNationalId instance if valid; otherwise, null.
   */
  static tryCreate(value: string, options: EgyptianNationalIdOptions = {}): EgyptianNationalId | null {
    if (!EgyptianNationalId.isValidFormat(value)) {
      return null;
    }

    try {
      return new EgyptianNationalId(value, options);
    } catch (error) {
      if (error instanceof EgyptianNationalIdError) {
        return null;
      }
      throw error;
    }
  }

  // ==================== Computed Properties ====================

  /** Gets the birth year extracted from the National ID. */
  get birthYear(): number {
    return this.birthDate.getFullYear();
  }

  /** Gets the birth month extracted from the National ID (1-12). */
  get birthMonth(): number {
    return this.birthDate.getMonth() + 1;
  }

  /** Gets the birth day extracted from the National ID. */
  get birthDay(): number {
    return this.birthDate.getDate();
  }

  /** Gets the calculated age based on the birth date. */
  get age(): number {
    return this.calculateAge();
  }

  /** Indicates whether the person is 18 years old or older. */
  get isAdult(): boolean {
    return this.age >= 18;
  }

  /** Gets the governorate name in Arabic. */
  get governorateNameAr(): string {
    return GovernorateArabicNames[this.governorate];
  }

  /** Gets the governorate name in English. */
  get governorateNameEn(): string {
    return GovernorateEnglishNames[this.governorate];
  }

  /** Gets the gender in Arabic. */
  get genderAr(): string {
    return this.gender === Gender.Male ? 'ذكر' : 'أنثى';
  }

  /** Gets the estimated date when the National ID was first issued. */
  get estimatedIssueDate(): Date {
    return this.calculateEstimatedIssueDate();
  }

  /** Gets the number of years since the estimated issue date. */
  get yearsSinceIssue(): number {
    return this.calculateYearsSinceIssue();
  }

  /** Gets the age of the National ID card in years. */
  get cardAge(): number {
    return this.yearsSinceIssue;
  }

  /** Gets the estimated expiry date of the National ID. */
  get estimatedExpiryDate(): Date {
    return this.calculateEstimatedExpiryDate();
  }

  /** Indicates whether the National ID is likely expired. */
  get isLikelyExpired(): boolean {
    return this.getToday() > this.estimatedExpiryDate;
  }

  /** Gets the number of years until the estimated expiry date. */
  get yearsUntilExpiry(): number {
    return this.calculateYearsUntilExpiry();
  }

  /** Indicates whether the ID is estimated to expire within the next year. */
  get isExpiringSoon(): boolean {
    return this.yearsUntilExpiry >= 0 && this.yearsUntilExpiry <= 1;
  }

  /** Indicates whether the person is old enough to have received their first National ID. */
  get isEligibleForNationalId(): boolean {
    return this.age >= FIRST_ISSUE_AGE;
  }

  /** Gets the geographic region where the person was born. */
  get birthRegion(): Region {
    return GovernorateToRegion[this.governorate];
  }

  /** Gets the birth region name in Arabic. */
  get birthRegionNameAr(): string {
    return RegionArabicNames[this.birthRegion];
  }

  /** Gets the birth region name in English. */
  get birthRegionNameEn(): string {
    return RegionEnglishNames[this.birthRegion];
  }

  /** Indicates whether the person was born in Upper Egypt. */
  get isFromUpperEgypt(): boolean {
    return this.birthRegion === Region.UpperEgypt;
  }

  /** Indicates whether the person was born in Lower Egypt. */
  get isFromLowerEgypt(): boolean {
    return this.birthRegion === Region.GreaterCairo || this.birthRegion === Region.Delta;
  }

  /** Indicates whether the person was born in a coastal region. */
  get isFromCoastalRegion(): boolean {
    return (
      this.birthRegion === Region.Delta ||
      this.birthRegion === Region.Canal ||
      this.birthRegion === Region.SinaiAndRedSea ||
      this.birthRegion === Region.WesternDesert
    );
  }

  /** Indicates whether the person was born in Greater Cairo. */
  get isFromGreaterCairo(): boolean {
    return this.birthRegion === Region.GreaterCairo;
  }

  /** Indicates whether the person was born in the Delta region. */
  get isFromDelta(): boolean {
    return this.birthRegion === Region.Delta;
  }

  /** Indicates whether the person was born in the Sinai or Red Sea region. */
  get isFromSinai(): boolean {
    return this.birthRegion === Region.SinaiAndRedSea;
  }

  /** Indicates whether the person was born abroad (outside Egypt). */
  get isBornAbroad(): boolean {
    return this.birthRegion === Region.Foreign;
  }

  // ==================== Formatting Methods ====================

  /**
   * Formats the National ID with dashes for readability.
   * Format: C-YYMMDD-GG-SSSSS
   * @example "3-010101-01-23456"
   */
  formatWithDashes(): string {
    const v = this.value;
    return `${v[0]}-${v.substring(1, 7)}-${v.substring(7, 9)}-${v.substring(9, 14)}`;
  }

  /**
   * Formats the National ID with spaces for readability.
   * Format: C YYMMDD GG SSSSS
   * @example "3 010101 01 23456"
   */
  formatWithSpaces(): string {
    const v = this.value;
    return `${v[0]} ${v.substring(1, 7)} ${v.substring(7, 9)} ${v.substring(9, 14)}`;
  }

  /**
   * Formats the National ID in a structured, human-readable format.
   */
  formatDetailed(): string {
    const centuryText = this.value[0] === '2' ? '1900s' : '2000s';
    const dateStr = this.formatDate(this.birthDate);

    return (
      `Century: ${this.value[0]} (${centuryText})\n` +
      `Birth Date: ${dateStr}\n` +
      `Governorate: ${this.governorateCode.toString().padStart(2, '0')} (${GovernorateEnglishNames[this.governorate]})\n` +
      `Serial: ${this.serialNumber.toString().padStart(4, '0')}\n` +
      `Gender: ${this.gender}`
    );
  }

  /**
   * Masks the National ID for privacy, showing only the first 3 and last 2 digits.
   * @example "301********67"
   */
  formatMasked(): string {
    const v = this.value;
    return `${v.substring(0, 3)}********${v.substring(12, 14)}`;
  }

  /**
   * Formats the National ID with grouping by logical segments.
   * Format: [C][YYMMDD][GG][SSSSS]
   * @example "[3][010101][01][23456]"
   */
  formatWithBrackets(): string {
    const v = this.value;
    return `[${v[0]}][${v.substring(1, 7)}][${v.substring(7, 9)}][${v.substring(9, 14)}]`;
  }

  /**
   * Returns the 14-digit National ID value.
   */
  toString(): string {
    return this.value;
  }

  /**
   * Converts the National ID to a JSON-serializable object.
   */
  toJSON(): Record<string, unknown> {
    return {
      value: this.value,
      birthDate: this.birthDate.toISOString().split('T')[0],
      birthYear: this.birthYear,
      birthMonth: this.birthMonth,
      birthDay: this.birthDay,
      age: this.age,
      isAdult: this.isAdult,
      gender: this.gender,
      genderAr: this.genderAr,
      governorateCode: this.governorateCode,
      governorate: GovernorateEnglishNames[this.governorate],
      governorateNameAr: this.governorateNameAr,
      governorateNameEn: this.governorateNameEn,
      serialNumber: this.serialNumber,
      birthRegion: RegionEnglishNames[this.birthRegion],
      birthRegionNameAr: this.birthRegionNameAr,
      birthRegionNameEn: this.birthRegionNameEn,
    };
  }

  // ==================== Comparison Methods ====================

  /**
   * Determines whether this National ID is equal to another.
   */
  equals(other: EgyptianNationalId | null | undefined): boolean {
    if (!other) {
      return false;
    }
    return this.value === other.value;
  }

  /**
   * Compares this National ID with another based on birth date.
   * @returns Negative if this is older, positive if younger, 0 if same.
   */
  compareTo(other: EgyptianNationalId | null | undefined): number {
    if (!other) {
      return 1;
    }

    const birthDateComparison = this.birthDate.getTime() - other.birthDate.getTime();
    if (birthDateComparison !== 0) {
      return birthDateComparison;
    }

    return this.serialNumber - other.serialNumber;
  }

  // ==================== Private Methods ====================

  private getToday(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private calculateAge(): number {
    const today = this.getToday();
    let age = today.getFullYear() - this.birthDate.getFullYear();

    const birthThisYear = new Date(
      today.getFullYear(),
      this.birthDate.getMonth(),
      this.birthDate.getDate()
    );

    if (birthThisYear > today) {
      age--;
    }

    return age;
  }

  private parseBirthDate(): Date {
    const year = this.parseYear();
    const month = this.parseMonth();
    const day = this.parseDay();

    // JavaScript months are 0-indexed
    const date = new Date(year, month - 1, day);

    // Validate the date is correct (handles invalid dates like Feb 31)
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      throw new InvalidBirthDateError('Invalid birth date extracted from National ID.');
    }

    return date;
  }

  private parseGender(): Gender {
    const genderDigit = parseInt(this.value[GENDER_DIGIT_INDEX], 10);
    return genderDigit % 2 === 0 ? Gender.Female : Gender.Male;
  }

  private parseGovernorateCode(): number {
    return parseInt(this.value.substring(GOVERNORATE_CODE_START_INDEX, GOVERNORATE_CODE_START_INDEX + 2), 10);
  }

  private parseGovernorate(): Governorate {
    const code = this.governorateCode;

    if (!ValidGovernorateCodes.has(code)) {
      throw new InvalidGovernorateCodeError(code.toString());
    }

    return code as Governorate;
  }

  private parseSerialNumber(): number {
    return parseInt(this.value.substring(SERIAL_START_INDEX, SERIAL_START_INDEX + SERIAL_LENGTH), 10);
  }

  private parseYear(): number {
    const centuryBase = this.getCenturyBase();
    const yearPart = parseInt(this.value.substring(BIRTH_YEAR_START_INDEX, BIRTH_YEAR_START_INDEX + 2), 10);
    return centuryBase + yearPart;
  }

  private parseMonth(): number {
    return parseInt(this.value.substring(BIRTH_MONTH_START_INDEX, BIRTH_MONTH_START_INDEX + 2), 10);
  }

  private parseDay(): number {
    return parseInt(this.value.substring(BIRTH_DAY_START_INDEX, BIRTH_DAY_START_INDEX + 2), 10);
  }

  private getCenturyBase(): number {
    const centuryDigit = this.value[CENTURY_DIGIT_INDEX];

    switch (centuryDigit) {
      case '2':
        return 1900;
      case '3':
        return 2000;
      default:
        throw new InvalidBirthDateError('Unsupported century digit in National ID.');
    }
  }

  private calculateEstimatedIssueDate(): Date {
    return new Date(
      this.birthDate.getFullYear() + FIRST_ISSUE_AGE,
      this.birthDate.getMonth(),
      this.birthDate.getDate()
    );
  }

  private calculateYearsSinceIssue(): number {
    const issueDate = this.estimatedIssueDate;
    const today = this.getToday();

    let years = today.getFullYear() - issueDate.getFullYear();

    const issueThisYear = new Date(
      today.getFullYear(),
      issueDate.getMonth(),
      issueDate.getDate()
    );

    if (issueThisYear > today) {
      years--;
    }

    return Math.max(0, years);
  }

  private calculateEstimatedExpiryDate(): Date {
    const issueDate = this.estimatedIssueDate;

    const validityPeriod =
      issueDate.getFullYear() < VALIDITY_PERIOD_CHANGE_YEAR ? 5 : VALIDITY_PERIOD_YEARS;

    return new Date(
      issueDate.getFullYear() + validityPeriod,
      issueDate.getMonth(),
      issueDate.getDate()
    );
  }

  private calculateYearsUntilExpiry(): number {
    const expiryDate = this.estimatedExpiryDate;
    const today = this.getToday();

    if (today > expiryDate) {
      let yearsSinceExpiry = today.getFullYear() - expiryDate.getFullYear();
      const expiryThisYear = new Date(
        today.getFullYear(),
        expiryDate.getMonth(),
        expiryDate.getDate()
      );

      if (expiryThisYear > today) {
        yearsSinceExpiry--;
      }

      return -yearsSinceExpiry;
    }

    let yearsUntil = expiryDate.getFullYear() - today.getFullYear();
    const todayNextYear = new Date(
      expiryDate.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (todayNextYear > expiryDate) {
      yearsUntil--;
    }

    return yearsUntil;
  }
}
