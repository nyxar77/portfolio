import { translate, type Language, type LanguagePreference } from "../hooks/useLanguage";

interface Props {
  language: Language;
  preference: LanguagePreference;
  onChange: (value: LanguagePreference) => void;
}

export function LanguageSelector({ language, preference, onChange }: Props) {
  return (
    <label className="language-selector" title={translate("Language", language)}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 5h12M9 3v2M5 5c1 5 4 8 8 10M13 5c-1 5-4 8-9 11M14 21l4-10 4 10M15.5 17h5" />
      </svg>
      <select
        aria-label={translate("Language", language)}
        value={preference}
        onChange={(event) => onChange(event.target.value as LanguagePreference)}
      >
        <option value="auto">{translate("Automatic", language)} ({language.toUpperCase()})</option>
        <option value="en" lang="en">English</option>
        <option value="fr" lang="fr">Français</option>
      </select>
    </label>
  );
}
