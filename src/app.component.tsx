import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoutesPath } from './core/common/routes';
import { LoadingIcon } from './core/components';
import image from './assets/images/bg.svg';
import './app.component.scss';

const Milestones = lazy(() => import('./core/pages/milestones/milestones.component'));
const Projects = lazy(() => import('./core/pages/projects/projects.component'));

export default function App() {
  return (
    <div className='app' style={{ backgroundImage: `url(${image})` }}>
      <Header />

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

function Header() {
  return (
    <header>
      <h1>Руководитель проекта</h1>
      <p>Создайте новый этап или просмотри существующий</p>
    </header>
  );
}
