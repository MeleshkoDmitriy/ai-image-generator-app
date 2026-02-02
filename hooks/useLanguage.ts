import { use } from "react";
import { LanguageContext, type LanguageContextValue } from "@/context";

export function useLanguage(): LanguageContextValue {
  const context = use(LanguageContext);

  if (context === null) throw new Error("useLanguage must be used within LanguageProvider");

  return context;
}
