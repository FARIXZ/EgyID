/**
 * Represents gender values.
 */
export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

/**
 * Represents Egyptian governorates with their official codes.
 */
export enum Governorate {
  Cairo = 1,
  Alexandria = 2,
  PortSaid = 3,
  Suez = 4,
  Damietta = 11,
  Dakahlia = 12,
  Sharqia = 13,
  Qalyubia = 14,
  KafrElSheikh = 15,
  Gharbia = 16,
  Monufia = 17,
  Beheira = 18,
  Ismailia = 19,
  Giza = 21,
  BeniSuef = 22,
  Fayoum = 23,
  Minya = 24,
  Asyut = 25,
  Sohag = 26,
  Qena = 27,
  Aswan = 28,
  Luxor = 29,
  RedSea = 31,
  NewValley = 32,
  Matrouh = 33,
  NorthSinai = 34,
  SouthSinai = 35,
  Foreign = 88,
}

/**
 * Represents the geographic regions of Egypt.
 */
export enum Region {
  GreaterCairo = 1,
  Delta = 2,
  Canal = 3,
  UpperEgypt = 4,
  SinaiAndRedSea = 5,
  WesternDesert = 6,
  Foreign = 7,
}

/**
 * Arabic names for governorates.
 */
export const GovernorateArabicNames: Record<Governorate, string> = {
  [Governorate.Cairo]: 'القاهرة',
  [Governorate.Alexandria]: 'الإسكندرية',
  [Governorate.PortSaid]: 'بورسعيد',
  [Governorate.Suez]: 'السويس',
  [Governorate.Damietta]: 'دمياط',
  [Governorate.Dakahlia]: 'الدقهلية',
  [Governorate.Sharqia]: 'الشرقية',
  [Governorate.Qalyubia]: 'القليوبية',
  [Governorate.KafrElSheikh]: 'كفر الشيخ',
  [Governorate.Gharbia]: 'الغربية',
  [Governorate.Monufia]: 'المنوفية',
  [Governorate.Beheira]: 'البحيرة',
  [Governorate.Ismailia]: 'الإسماعيلية',
  [Governorate.Giza]: 'الجيزة',
  [Governorate.BeniSuef]: 'بني سويف',
  [Governorate.Fayoum]: 'الفيوم',
  [Governorate.Minya]: 'المنيا',
  [Governorate.Asyut]: 'أسيوط',
  [Governorate.Sohag]: 'سوهاج',
  [Governorate.Qena]: 'قنا',
  [Governorate.Aswan]: 'أسوان',
  [Governorate.Luxor]: 'الأقصر',
  [Governorate.RedSea]: 'البحر الأحمر',
  [Governorate.NewValley]: 'الوادي الجديد',
  [Governorate.Matrouh]: 'مطروح',
  [Governorate.NorthSinai]: 'شمال سيناء',
  [Governorate.SouthSinai]: 'جنوب سيناء',
  [Governorate.Foreign]: 'خارج الجمهورية',
};

/**
 * English names for governorates.
 */
export const GovernorateEnglishNames: Record<Governorate, string> = {
  [Governorate.Cairo]: 'Cairo',
  [Governorate.Alexandria]: 'Alexandria',
  [Governorate.PortSaid]: 'PortSaid',
  [Governorate.Suez]: 'Suez',
  [Governorate.Damietta]: 'Damietta',
  [Governorate.Dakahlia]: 'Dakahlia',
  [Governorate.Sharqia]: 'Sharqia',
  [Governorate.Qalyubia]: 'Qalyubia',
  [Governorate.KafrElSheikh]: 'KafrElSheikh',
  [Governorate.Gharbia]: 'Gharbia',
  [Governorate.Monufia]: 'Monufia',
  [Governorate.Beheira]: 'Beheira',
  [Governorate.Ismailia]: 'Ismailia',
  [Governorate.Giza]: 'Giza',
  [Governorate.BeniSuef]: 'BeniSuef',
  [Governorate.Fayoum]: 'Fayoum',
  [Governorate.Minya]: 'Minya',
  [Governorate.Asyut]: 'Asyut',
  [Governorate.Sohag]: 'Sohag',
  [Governorate.Qena]: 'Qena',
  [Governorate.Aswan]: 'Aswan',
  [Governorate.Luxor]: 'Luxor',
  [Governorate.RedSea]: 'RedSea',
  [Governorate.NewValley]: 'NewValley',
  [Governorate.Matrouh]: 'Matrouh',
  [Governorate.NorthSinai]: 'NorthSinai',
  [Governorate.SouthSinai]: 'SouthSinai',
  [Governorate.Foreign]: 'Foreign',
};

/**
 * Arabic names for regions.
 */
export const RegionArabicNames: Record<Region, string> = {
  [Region.GreaterCairo]: 'القاهرة الكبرى',
  [Region.Delta]: 'الدلتا',
  [Region.Canal]: 'قناة السويس',
  [Region.UpperEgypt]: 'الصعيد',
  [Region.SinaiAndRedSea]: 'سيناء والبحر الأحمر',
  [Region.WesternDesert]: 'الصحراء الغربية',
  [Region.Foreign]: 'خارج الجمهورية',
};

/**
 * English names for regions.
 */
export const RegionEnglishNames: Record<Region, string> = {
  [Region.GreaterCairo]: 'GreaterCairo',
  [Region.Delta]: 'Delta',
  [Region.Canal]: 'Canal',
  [Region.UpperEgypt]: 'UpperEgypt',
  [Region.SinaiAndRedSea]: 'SinaiAndRedSea',
  [Region.WesternDesert]: 'WesternDesert',
  [Region.Foreign]: 'Foreign',
};

/**
 * Maps governorates to their regions.
 */
export const GovernorateToRegion: Record<Governorate, Region> = {
  // Greater Cairo
  [Governorate.Cairo]: Region.GreaterCairo,
  [Governorate.Giza]: Region.GreaterCairo,
  [Governorate.Qalyubia]: Region.GreaterCairo,

  // Delta
  [Governorate.Alexandria]: Region.Delta,
  [Governorate.Damietta]: Region.Delta,
  [Governorate.Dakahlia]: Region.Delta,
  [Governorate.Sharqia]: Region.Delta,
  [Governorate.KafrElSheikh]: Region.Delta,
  [Governorate.Gharbia]: Region.Delta,
  [Governorate.Monufia]: Region.Delta,
  [Governorate.Beheira]: Region.Delta,

  // Canal
  [Governorate.PortSaid]: Region.Canal,
  [Governorate.Suez]: Region.Canal,
  [Governorate.Ismailia]: Region.Canal,

  // Upper Egypt
  [Governorate.BeniSuef]: Region.UpperEgypt,
  [Governorate.Fayoum]: Region.UpperEgypt,
  [Governorate.Minya]: Region.UpperEgypt,
  [Governorate.Asyut]: Region.UpperEgypt,
  [Governorate.Sohag]: Region.UpperEgypt,
  [Governorate.Qena]: Region.UpperEgypt,
  [Governorate.Aswan]: Region.UpperEgypt,
  [Governorate.Luxor]: Region.UpperEgypt,

  // Sinai & Red Sea
  [Governorate.RedSea]: Region.SinaiAndRedSea,
  [Governorate.NorthSinai]: Region.SinaiAndRedSea,
  [Governorate.SouthSinai]: Region.SinaiAndRedSea,

  // Western Desert
  [Governorate.NewValley]: Region.WesternDesert,
  [Governorate.Matrouh]: Region.WesternDesert,

  // Foreign
  [Governorate.Foreign]: Region.Foreign,
};

/**
 * Set of valid governorate codes for quick lookup.
 */
export const ValidGovernorateCodes = new Set(Object.values(Governorate).filter((v): v is number => typeof v === 'number'));
