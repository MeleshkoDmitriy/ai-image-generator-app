import { LanguageContext, LanguageContextValue } from "@/providers";
import { useContext } from "react";

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (context === null) throw new Error("useLanguage must be used within LanguageProvider");

  return context;
}
