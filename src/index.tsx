import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UsersCertificatesPage from 'pages/UsersCertificates/Page';
import UsersHalfComplitedCoursesPage from 'pages/StatisticsHalfCompleteCourse/Page';
import { Toaster } from 'components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'services/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <div className='p-8'>

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UsersCertificatesPage />
                <UsersHalfComplitedCoursesPage />
                <Toaster />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </div>
  </React.StrictMode>
);
