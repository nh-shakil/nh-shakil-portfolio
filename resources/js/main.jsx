import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './portfolio/App';
import { ErrorBoundary } from './portfolio/components/system/ErrorBoundary';

const rootEl = document.getElementById('app');
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
}

