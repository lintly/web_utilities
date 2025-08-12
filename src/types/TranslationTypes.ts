export interface TranslationData {
  [key: string]: string | TranslationData;
}

export interface LanguageFile {
  code: string;
  data: TranslationData;
  name: string;
}

export interface DiffResult {
  key: string;
  missing: string[];
  path: string;
  present: string[];
}
