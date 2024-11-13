import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
<div className="container mt-5">
  {/* Main title with lead text */}
  <div className="text-center mb-5">
    <h1 className="display-4 font-weight-bold text-dark">{t('homepage.title')}</h1>
    <p className="lead text-muted">{t('homepage.section1.content.0')}</p>
  </div>

  {/* Section 1 - Who Can Own Property */}
  <section className="mb-5">
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 card-title text-primary">
          <i className="bi bi-house-door-fill me-2"></i>{t('homepage.section1.heading')}
        </h2>
        <p className="card-text">{t('homepage.section1.content.0')}</p>
        <ul className="list-unstyled">
          <li className="mb-2">
            <i className="bi bi-check-circle-fill text-success me-2"></i>{t('homepage.section1.content.1')}
          </li>
          <li>
            <i className="bi bi-check-circle-fill text-success me-2"></i>{t('homepage.section1.content.2')}
          </li>
        </ul>
      </div>
    </div>
  </section>

  {/* Section 2 - Additional Considerations */}
  <section className="mb-5">
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 card-title text-primary">
          <i className="bi bi-exclamation-circle-fill me-2"></i>{t('homepage.section2.heading')}
        </h2>
        <ul className="list-unstyled">
          <li className="mb-2">
            <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>{t('homepage.section2.content.0')}
          </li>
          <li>
            <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>{t('homepage.section2.content.1')}
          </li>
        </ul>
      </div>
    </div>
  </section>

  {/* Section 3 - Benefits of Owning Property */}
  <section className="mb-5">
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 card-title text-primary">
          <i className="bi bi-emoji-smile-fill me-2"></i>{t('homepage.section3.heading')}
        </h2>
        <ul className="list-unstyled">
          <li className="mb-2">
            <i className="bi bi-check2-circle text-success me-2"></i>{t('homepage.section3.content.0')}
          </li>
          <li className="mb-2">
            <i className="bi bi-check2-circle text-success me-2"></i>{t('homepage.section3.content.1')}
          </li>
          <li className="mb-2">
            <i className="bi bi-check2-circle text-success me-2"></i>{t('homepage.section3.content.2')}
          </li>
          <li className="mb-2">
            <i className="bi bi-check2-circle text-success me-2"></i>{t('homepage.section3.content.3')}
          </li>
        </ul>
      </div>
    </div>
  </section>
</div>


  );
};

export default HomePage;
