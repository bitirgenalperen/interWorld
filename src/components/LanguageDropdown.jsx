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
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        id="languageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src={`${process.env.PUBLIC_URL}/${i18n.language}.png`}
          alt={i18n.language}
          style={{ height: '20px', marginRight: '5px' }}
        />
        {i18n.language === 'en' ? 'English' :
         i18n.language === 'tr' ? 'Türkçe' :
         i18n.language === 'ms' ? 'Malay' :
         i18n.language === 'zh' ? '中文' :
         i18n.language === 'hi' ? 'हिन्दी' :
         i18n.language === 'ur' ? 'اردو' :
         i18n.language === 'fr' ? 'Français' :
         'Русский'}
      </button>
      <ul className="dropdown-menu" aria-labelledby="languageDropdown">
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLanguageChange('en')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/en.png`}
              alt="English"
              style={{ height: '20px', marginRight: '5px' }}
            />
            English
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLanguageChange('zh')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/zh.png`}
              alt="Chinese"
              style={{ height: '20px', marginRight: '5px' }}
            />
            中文
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLanguageChange('fr')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/fr.png`}
              alt="French"
              style={{ height: '20px', marginRight: '5px' }}
            />
            Français
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLanguageChange('hi')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/hi.png`}
              alt="Hindi"
              style={{ height: '20px', marginRight: '5px' }}
            />
            हिन्दी
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLanguageChange('ms')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/ms.png`}
              alt="Malay"
              style={{ height: '20px', marginRight: '5px' }}
            />
            Melayu
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLanguageChange('ru')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/ru.png`}
              alt="Russian"
              style={{ height: '20px', marginRight: '5px' }}
            />
            Русский
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLanguageChange('tr')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/tr.png`}
              alt="Turkish"
              style={{ height: '20px', marginRight: '5px' }}
            />
            Türkçe
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLanguageChange('ur')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/ur.png`}
              alt="Urdu"
              style={{ height: '20px', marginRight: '5px' }}
            />
            اردو
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageDropdown;
