export type LanguageCode = "en" | "te" | "hi";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
}

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "te", label: "తెలుగు" },
  { code: "hi", label: "हिन्दी" },
];

export const LANGUAGE_STORAGE_KEY = "biofactor-language";
