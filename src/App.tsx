import { Fragment } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout';
import type { LayoutComponent, RouteType } from './types';
import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';
import { modals, privateRoutes, publicRoutes } from './routers/router';
import useTheme from './hooks/useTheme';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import { useMyInfo } from './hooks/useMyInfo';
import { useMutationState } from '@tanstack/react-query';
import RenderIf from './components/RenderIf';
import LoadingTable from './components/LoadingTable';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  useTheme();
  useMyInfo();
  const isMutating =
    useMutationState({
      filters: {
        status: 'pending',
      },
    }).length > 0;

  const location = useLocation();
  const background = location.state && location.state.background;

  const loadRoute = (route: RouteType, index: number) => {
    const Page = route.component;

    let Layout: LayoutComponent = DefaultLayout;

    if (route.layout === null) {
      Layout = Fragment;
    } else if (route.layout) {
      Layout = route.layout;
    }

    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      >
        {route.children?.map((child, index) => {
          const ChildPage = child.component;
          return <Route key={index} path={child.path} element={<ChildPage />} />;
        })}
      </Route>
    );
  };

  const loadModalRoute = (route: RouteType, index: number) => {
    const Page = route.component;
    return <Route key={index} path={route.path} element={<Page />} />;
  };

  return (
    <>
      <RenderIf value={isMutating}>
        <LoadingTable />
      </RenderIf>
      <Routes location={background || location}>
        <Route element={<PublicRoute />}>{publicRoutes.map(loadRoute)}</Route>
        <Route element={<PrivateRoute />}>{privateRoutes.map(loadRoute)}</Route>
      </Routes>
      {background && (
        <Routes>
          <Route element={<PrivateRoute />}>{modals.map(loadModalRoute)}</Route>
        </Routes>
      )}
      <ScrollToTop />
      <Toaster richColors position="top-right" closeButton theme="light" />
      {/* <ReactQueryDevtools /> */}
    </>
  );
}

export default App;
