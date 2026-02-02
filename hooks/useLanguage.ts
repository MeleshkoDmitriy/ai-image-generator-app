import { useContext } from "react";
import { LanguageContext, type LanguageContextValue } from "@/context";

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (context === null) throw new Error("useLanguage must be used within LanguageProvider");

  return context;
}
