import React, { useContext } from 'react';
import { Routes as DOMRoutes, Route, Navigate } from 'react-router-dom';

import { Toaster } from 'components/ui/toaster';

import UsersCertificatesPage from 'pages/UsersCertificates/Page';

import UsersHalfComplitedCoursesPage from 'pages/StatisticsHalfCompleteCourse/Page';

export const Routes = () => {
  return (
    <>
      <DOMRoutes>
        <Route
          path={'/'}
          element={
            <>
              <UsersCertificatesPage />

              <UsersHalfComplitedCoursesPage />
            </>
          }
        />
        {/* Agar foydalanuvchi ruxsat berilmagan sahifaga kirmoqchi bo'lsa, bosh sahifaga yo'naltirish */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </DOMRoutes>
      <Toaster />
    </>
  );
};
