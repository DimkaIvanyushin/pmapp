import React from 'react';
import { Languages } from '../../common';

type SwitchLanguageProps = {
  language: Languages;
  onLanguage: (Language: Languages) => void;
};

export function SwitchLanguage({ language, onLanguage }: SwitchLanguageProps) {
  const langs = [Languages.EN, Languages.RU];

  function handlerLanguage(_language: Languages) {
    if (!_language) throw new Error('Язык не выбран!');
    onLanguage(_language);
  }

  return (
    <select onChange={(e) => handlerLanguage(e.target.value as Languages)} value={language}>
      {langs.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}
