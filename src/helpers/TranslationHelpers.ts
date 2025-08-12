import { TranslationData } from "@src/types/TranslationTypes";

// Flatten nested translation object
export const flattenTranslations = (
  obj: TranslationData,
  prefix = "",
): { [key: string]: string } => {
  const flattened: { [key: string]: string } = {};

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "string") {
      flattened[newKey] = obj[key] as string;
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(
        flattened,
        flattenTranslations(obj[key] as TranslationData, newKey),
      );
    }
  }

  return flattened;
};

// Unflatten translations back to nested structure
export const unflattenTranslations = (flattened: {
  [key: string]: string;
}): TranslationData => {
  const result: TranslationData = {};

  for (const key in flattened) {
    const keys = key.split(".");
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]] as TranslationData;
    }

    current[keys[keys.length - 1]] = flattened[key];
  }

  return result;
};
