import { use } from "react";
import { LanguageContext, type LanguageContextValue } from "@/context";

export function useLanguageContext(): LanguageContextValue {
  const context = use(LanguageContext);

  if (!context) throw new Error("useLanguageContext must be used within LanguageProvider");

  return context;
}
