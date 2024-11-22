import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang); // Store language preference
  };

  return (
    <div className="dropdown">
      {/* Dropdown Button */}
      <button
        className="btn btn-outline-secondary dropdown-toggle rounded-pill"
        type="button"
        id="languageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {/* Only Show Flag When Dropdown is Closed */}
        <img
          src={`${process.env.PUBLIC_URL}/${i18n.language}.png`}
          alt={i18n.language}
          style={{ height: '16px', marginRight: '5px'}}
        />
      </button>

      {/* Dropdown Menu */}
      <ul className="dropdown-menu" aria-labelledby="languageDropdown">
        {[
          { code: 'en', label: 'English' },
          { code: 'zh', label: '中文' },
          { code: 'fr', label: 'Français' },
          { code: 'hi', label: 'हिन्दी' },
          { code: 'ms', label: 'Melayu' },
          { code: 'ru', label: 'Русский' },
          { code: 'tr', label: 'Türkçe' },
          { code: 'ur', label: 'اردو' },
        ].map((language) => (
          <li key={language.code}>
            <button
              className="dropdown-item"
              onClick={() => handleLanguageChange(language.code)}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/${language.code}.png`}
                alt={language.label}
                style={{ height: '15px', marginRight: '5px' }}
              />
              {language.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
