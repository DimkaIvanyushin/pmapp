import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoutesPath } from './core/common/routes';
import { LoadingIcon, SwitchLanguage } from './core/components';
import { Languages, Strings } from './core/common';
import { getLang } from './core/common/utils';
import image from './assets/images/bg.svg';
import './app.component.scss';

const Milestones = lazy(() => import('./core/pages/milestones/milestones.component'));
const Projects = lazy(() => import('./core/pages/projects/projects.component'));
const LocalStorageLangKey = 'userLang';

export default function App() {
  const [language, setLanguage] = useState<Languages>(() => {
    const userLang = (localStorage.getItem(LocalStorageLangKey) as Languages) || getLang();
    Strings.setLanguage(userLang);
    return userLang;
  });

  function handlerChangeLang(language: Languages) {
    localStorage.setItem(LocalStorageLangKey, language);
    Strings.setLanguage(language);
    setLanguage(language);
  }

  return (
    <div className='app' style={{ backgroundImage: `url(${image})` }}>
      <div className='app-menu'>
        <SwitchLanguage language={language} onLanguage={handlerChangeLang} />
      </div>

      <div className='app-header'>
        <h1>{Strings.header}</h1>
        <p>{Strings.description}</p>
      </div>

      <Router>
        <Suspense fallback={<LoadingIcon />}>
          <Routes>
            <Route path={RoutesPath.HOME} element={<Projects />} />
            <Route path={RoutesPath.HOME + RoutesPath.MILESTONE} element={<Milestones />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}
