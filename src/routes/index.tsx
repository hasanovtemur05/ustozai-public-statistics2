import React, { useContext } from 'react';
import { Routes as DOMRoutes, Route, Navigate } from 'react-router-dom';

import { Toaster } from 'components/ui/toaster';

import UsersCertificatesPage from 'pages/UsersCertificates/Page';

import UsersHalfComplitedCoursesPage from 'pages/StatisticsHalfCompleteCourse/Page';

export const Routes = () => {
  return (
    <div className='p-8'>
      {/* <DOMRoutes>
        <Route
          path={'/'}
          element={
            <>
            
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </DOMRoutes> */}


        <UsersCertificatesPage />

              <UsersHalfComplitedCoursesPage />
      <Toaster />
    </div>
  );
};
